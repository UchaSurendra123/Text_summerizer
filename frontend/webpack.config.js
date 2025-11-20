const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
entry: path.resolve(__dirname, "src", "index.js"),
output: {
path: path.resolve(__dirname, "dist"),
filename: "bundle.js",
clean: true
},
mode: "development",
devServer: {
static: path.resolve(__dirname, "dist"),
port: 3000,
open: true,
hot: true
},
module: {
rules: [
{
test: /.css$/i,
use: ["style-loader", "css-loader"]
}
]
},
plugins: [
new HtmlWebpackPlugin({
template: path.resolve(__dirname, "src", "index.html"), // absolute path fixes errors
filename: "index.html"
})
]
};
