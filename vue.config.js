module.exports = {
    publicPath: '/',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "해와달인테리어";
                return args;
            })
    }
}
