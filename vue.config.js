
module.exports = {
    /* 修改html标题 */
	chainWebpack: config => {
		config.plugin('html')
			.tap(args => {
				console.log(args);
				args[0].title = "展会季";
				return args;
			})
	},
    devServer: {
        disableHostCheck: true,

    },
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/'
}
