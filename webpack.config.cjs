const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './only-js/scripts/index.js', // Указывает на правильный путь к index.js
	output: {
		path: path.resolve(__dirname, 'dist'), // Папка для финальной сборки
		filename: 'bundle.js', // Имя скомпилированного файла
		clean: true, // Очистка dist перед сборкой
	},
	mode: 'development', // Используйте 'production' для финальной сборки
	plugins: [
		new HtmlWebpackPlugin({
			template: './only-js/index.html', // Указывает на HTML-шаблон
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/, // Обработка CSS файлов
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.js$/, // Обработка JS файлов
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	devServer: {
		static: path.resolve(__dirname, 'dist'), // Папка, которую сервер должен обслуживать
		open: true, // Автоматически открывать браузер
		port: 8080, // Порт для dev-сервера
	},
};
