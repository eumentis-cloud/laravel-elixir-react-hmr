# laravel-elixir-react-hmr

*This is for development only. Should not be used on production servers.*

For one of my projects, I planned to use Laravel for backend and React for frontend. I decided to use Webpack for bundling all my JS files (to use features like [HMR](https://webpack.github.io/docs/hot-module-replacement.html
) and [React Hot Loader](https://github.com/gaearon/react-hot-loader) for development) and Laravel Elixir for all other assets (css, images, fonts, etc.). I also wanted to use BrowserSync for laravel livereloads and multi-device testing. Thus, I wanted to connect Webpack bundler with Laravel and serve it using BrowserSync. 

Jeffery Way has created official Webpack and BrowserSync extensions for Laravel. His Webpack extension does not support webpack-dev-server, HMR and React Hot Loader. Also there is no support for connecting the Webpack output to BrowserSync. I was not able to find any article or package that achieved this. Therefore I decided to develop a Laravel Elixir extension to achieve this.

I am a self-learned programmer/developer and this is my first public package.

## Features
* Laravel 5+ backend server and React frontend
* Webpack for Javascript compilation and Laravel Elixir for all non-JS assets
* Multiple input JS files supported (for multi-page application)
* BrowserSync support (LiveReload non-JS assets, multi-device testing)
* ES6 and React compilation using Babel
* Webpack hot module replacement (LiveReload JS modules)
* React Hot Loader 3 (LiveReload React components) 

## Usage
At the moment, users cannot change or provide custom Webpack and BrowserSync configuration. As of now, custom Webpack and BrowserSync config cannot be passed. Will add the options in future.

### Step 1 : Install
```shell
npm i -D laravel-elixir-react-hmr
```
### Step 2 : Usage
```javascript
// Add to gulpfile.js
require('laravel-elixir-react-hmr');
```
Use just like any other Laravel Elixir tasks [i.e. mix.taskName(options)]
```
elixir(function(mix) {
    mix.react(options);
});
```
The config options are provided in the form of Javascript object.
#### Options
```Javascript
// The values given below are the default values
{
    // The URL of your Laravel dev server
    proxy: 'homestead.app',
    
    // List of relative paths (w.r.t '/resources/assets/js') of the input Javascript files
    inputFiles: [
        './app.js'
    ],
    
    // The relative path (w.r.t '/public/js') of the bundled JS output folder
    // The output dir must always be inside the '/public' directory as the application is served from the '/public' dir
    outputDir: './',
    
    // OPTIONAL
    // IP address to use for BrowserSync external URL (used for multi-device access)
    //      Sometimes BrowserSync sets the wrong IP address and external URL doesn't work.
    host: ''
}
```

## Future features
* Custom Webpack config
* Custom BrowserSync config
* Bundling JS for production
* Make an example app

