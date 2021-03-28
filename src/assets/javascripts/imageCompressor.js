function warnAboutOptions(options) {
    // Safe-ify Options
    options.maxWidth = options.maxWidth || 1000;
    options.maxHeight = options.maxHeight || 1000;

    if (options.maxWidth && typeof options.maxWidth !== "number") {
        Logger.warn(`[config error] 'maxWidth' is required to be a "number" (in pixels), recieved: ${options.maxWidth} -> using default 1000`);
        options.maxWidth = 1000;
    }
    if (options.maxHeight && typeof options.maxHeight !== "number") {
        Logger.warn(`[config error] 'maxHeight' is required to be a "number" (in pixels), recieved: ${options.maxHeight} -> using default 1000`);
        options.maxHeight = 1000;
    }
    if (options.quality && typeof options.quality !== "number") {
        Logger.warn(`quill.imageCompressor: [config error] 'quality' is required to be a "number", recieved: ${options.quality} -> using default 0.7`
        );
        options.quality = 0.7;
    }
    if (
        options.imageType &&
        (typeof options.imageType !== "string" ||
            !options.imageType.startsWith("image/"))
    ) {
        Logger.warn(`quill.imageCompressor: [config error] 'imageType' is required be in the form of "image/png" or "image/jpeg" etc ..., recieved: ${options.imageType} -> using default image/jpeg`);
        options.imageType = "image/jpeg";
    }
}

let debug = true;
const Logger = {
    prefixString() {
        return `</> quill-image-compress: `;
    },
    get log() {
        if (!debug) {return (...any) => {};}
        const boundLogFn = console.log.bind(console, this.prefixString());
        return boundLogFn;
    },
    get error() {
        const boundLogFn = console.error.bind(console, this.prefixString());
        return boundLogFn;
    },
    get warn() {
        const boundLogFn = console.warn.bind(console, this.prefixString());
        return boundLogFn;
    },
};

const {ImageDrop} = require("./quill.imageDrop");
const {file2b64} = require("./file2b64");

class imageCompressor {
    constructor(quill, options) {
        this.quill = quill;
        this.range = null;
        this.options = options;
        debug = options && options.debug;

        const onImageDrop = async (dataUrl) => {
            Logger.log("onImageDrop", {dataUrl});
            const dataUrlCompressed = await this.downscaleImageFromUrl(dataUrl);
            this.insertToEditor(dataUrlCompressed);
        };
        this.imageDrop = new ImageDrop(quill, onImageDrop, Logger);
        warnAboutOptions(options);

        Logger.log("fileChanged", {options, quill, debug});

        var toolbar = this.quill.getModule("toolbar");
        if (toolbar) {
            toolbar.addHandler("image", () => this.selectLocalImage());
        } else {
            Logger.error('Quill toolbar module not found! need { toolbar: // options } in Quill.modules for image icon to sit in')
        }
    }

    selectLocalImage() {
        this.range = this.quill.getSelection();
        this.fileHolder = document.createElement("input");
        this.fileHolder.setAttribute("type", "file");
        this.fileHolder.setAttribute("accept", "image/*");
        this.fileHolder.setAttribute("style", "visibility:hidden");

        this.fileHolder.onchange = () => this.fileChanged();

        document.body.appendChild(this.fileHolder);

        this.fileHolder.click();

        window.requestAnimationFrame(() => {
            document.body.removeChild(this.fileHolder);
        });
    }

    async fileChanged() {
        const file = this.fileHolder.files[0];
        Logger.log("fileChanged", {file});
        if (!file) {
            return;
        }
        const base64ImageSrc = await file2b64(file);
        const base64ImageSmallSrc = await this.downscaleImageFromUrl(
            base64ImageSrc
        );
        this.insertToEditor(base64ImageSmallSrc);
    }

    async downscaleImageFromUrl(dataUrl) {
        const dataUrlCompressed = await downscaleImage(
            dataUrl,
            this.options.maxWidth,
            this.options.maxHeight,
            this.options.imageType,
            this.options.quality,
            this.options.tagName,
            this.debug
        );
        Logger.log("downscaleImageFromUrl", {dataUrl, dataUrlCompressed});
        return dataUrlCompressed;
    }

    insertToEditor(url) {
        Logger.log('insertToEditor', {url});
        this.range = this.quill.getSelection();
        const range = this.range;
        // Insert the compressed image
        this.logFileSize(url);
        this.quill.insertEmbed(range.index, "image", `${url}`, "user");
        // Move cursor to next position
        range.index++;
        this.quill.setSelection(range, "api");
    }

    logFileSize(dataUrl) {
        const head = "data:image/png;base64,";
        const fileSizeBytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
        const fileSizeKiloBytes = (fileSizeBytes / 1024).toFixed(0);
        Logger.log("estimated img size: " + fileSizeKiloBytes + " kb");
    }
}

const MAX_WIDTH = 1280
const MAX_HEIGHT = 720
const MAX_SIZE = 30000 // 30kb

async function resize(img, type = 'jpeg') {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    ctx.drawImage(img, 0, 0)

    let width = img.width
    let height = img.height
    let start = 0
    let end = 1
    let last, accepted, blob

    // keep portration
    if (width > height) {
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
        }
    } else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
        }
    }
    canvas.width = width
    canvas.height = height
    console.log('Scaling image down to max 1280x720 while keeping aspect ratio')
    ctx.drawImage(img, 0, 0, width, height)

    accepted = blob = canvas.toDataURL('image/' + type, 1)
    if (blob.length < MAX_SIZE) {
        console.log('No quality change needed')
        return blob
    } else {
        console.log(`Image size after scaling ${blob.length} bytes`)
    }

    // Binary search for the right size
    while (true) {
        const mid = Math.round(((start + end) / 2) * 100) / 100
        if (mid === last) {
            return Promise.resolve(blob)
        }
        last = mid

        img.src = blob
        await new Promise(resolve => {
            img.onload = () => {
                ctx.drawImage(img, 0, 0)
                resolve()
            }
        })

        blob = canvas.toDataURL('image/' + type, mid)
        console.log(`Quality set to ${mid} gave a URL size of ${blob.length} bytes`)
        if (blob.length > MAX_SIZE) {
            end = mid
        }
        if (blob.length < MAX_SIZE) {
            start = mid;
            accepted = blob
        }
    }
}

function compress(base64, options) {
    return new Promise(function (resolve, reject) {
        var type = options.type,
            width = options.width,
            min = options.min,
            max = options.max;
        var img = new Image();
        var quality = 0.6;
        img.src = base64;
        img.setAttribute('crossOrigin', 'Anonymous');
        var imgWidth, imgHeight;

        img.onload = function () {
            imgWidth = img.width;
            imgHeight = img.height;
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            if (Math.max(imgWidth, imgHeight) > width) {
                if (imgWidth > imgHeight) {
                    canvas.width = width;
                    canvas.height = width * imgHeight / imgWidth;
                } else {
                    canvas.height = width;
                    canvas.width = width * imgWidth / imgHeight;
                }
            } else {
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                quality = 0.6;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            var base64 = canvas.toDataURL(type, quality);

            while (base64.length / 1024 > max) {
                quality -= 0.01;
                const newbase64 = canvas.toDataURL(type, quality);
                if (base64.length === newbase64.length)break
                base64 = newbase64
            }

            while (base64.length / 1024 < min) {
                quality += 0.001;
                base64 = canvas.toDataURL(type, quality);
            }

            resolve(base64);
        };

        img.onerror = function () {
            reject();
        };
    });
}

// Take an image URL, downscale it to the given width, and return a new image URL.
async function downscaleImage(
    dataUrl,
    maxWidth,
    maxHeight,
    imageType,
    imageQuality,
    tagName
) {
    "use strict";
    // Provide default values
    imageType = imageType || "jpeg";

    console.log('downscaling start', dataUrl.length)
    const compressedDataUrl = await compress(dataUrl,
        {
            width: 1000,
            type: 'image/jpeg', // default
            max: 30, // max size
        })
    // if (document.querySelector(tagName).innerHTML.length + compressedDataUrl.length > 100000) return alert('컨텐츠 사이즈를 초과했습니다.')
    console.log('downscaled result', compressedDataUrl.length)
    return compressedDataUrl;
}

function getDimensions(inputWidth, inputHeight, maxWidth, maxHeight) {
    if (inputWidth <= maxWidth && inputHeight <= maxHeight) {
        return [inputWidth, inputHeight];
    }
    if (inputWidth > maxWidth) {
        const newWidth = maxWidth;
        const newHeight = Math.floor((inputHeight / inputWidth) * newWidth);

        if (newHeight > maxHeight) {
            const newHeight = maxHeight;
            const newWidth = Math.floor((inputWidth / inputHeight) * newHeight);
            return [newWidth, newHeight];
        } else {
            return [newWidth, newHeight];
        }
    }
    if (inputHeight > maxHeight) {
        const newHeight = maxHeight;
        const newWidth = Math.floor((inputWidth / inputHeight) * newHeight);
        return [newWidth, newHeight];
    }
}

window.imageCompressor = imageCompressor;
export {imageCompressor};
export default imageCompressor
