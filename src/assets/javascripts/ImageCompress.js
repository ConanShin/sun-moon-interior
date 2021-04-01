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

async function downscaleImage(
    dataUrl,
    maxWidth,
    maxHeight,
    imageType,
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

module.exports = downscaleImage