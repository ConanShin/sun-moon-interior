export const titleToPy = (title: string) => {
    const tokens = title.split(' ')
    return tokens[tokens.length - 1].substr(0, 2)
}

export default {titleToPy}