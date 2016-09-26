# laravel-elixir-react-hmr
For one of my projects, I planned to use Laravel for backend and React for frontend. I decided to use Webpack for bundling all my JS files (to use features like [HMR](https://webpack.github.io/docs/hot-module-replacement.html
) and [React Hot Loader](https://github.com/gaearon/react-hot-loader) for development) and Laravel Elixir for all other assets (css, images, fonts, etc.). I also wanted to use BrowserSync for laravel livereloads and multi-device testing. Thus, I wanted to connect Webpack bundler with Laravel and serve it using BrowserSync. 

Jeffery Way has created official Webpack and BrowserSync extensions for Laravel. His Webpack extension does not support webpack-dev-server, HMR and React Hot Loader. Also there is no support for connecting the Webpack output to BrowserSync. I was not able to find any article or package that achieved this. Therefore I decided to develop a Laravel Elixir extension to achieve this.

I am a self-learned programmer/developer and this is my first public package.
