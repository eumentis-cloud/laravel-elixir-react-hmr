let Elixir = require('laravel-elixir');
module.exports = {
    // Watch the following files for changes
    //      Taken from laravel-elixir-browsersync-official
    //      JS files not included as they are watched by webpack middleware
    files: [
        Elixir.config.appPath + '/**/*.php',
        Elixir.config.get('public.css.outputFolder') + '/**/*.css',
        Elixir.config.get('public.js.outputFolder') + '/**/*.js',
        Elixir.config.get('public.versioning.buildFolder') + '/rev-manifest.json',
        Elixir.config.viewPath + '/**/*.php'
    ],

    // File watching options that get passed along to Chokidar
    watchOptions: {
        usePolling: true
    },

    // Reload each browser when Browsersync is restarted
    reloadOnRestart : true,

    // Show notifications in the browser
    notify: true,
};