const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: [/\.scss$/, /\.css$/],
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 4200
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
        }),
        new CopyWebpackPlugin([
            { from: './assets', to: 'assets' }
        ])
    ]
};
