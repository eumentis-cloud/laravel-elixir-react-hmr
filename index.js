let Elixir = require('laravel-elixir');
let _ = require('lodash');
let Path = require('path');


let browserSync = require('browser-sync').create();
let Webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');

// Load default BrowserSync config
let bsConfig = require('./config/browsersync.config');
let webpackConfig = require('./config/webpack.config');

// Default Javascript input and output dir
const PATHS = {
    in_js: Path.join(process.cwd(), 'resources/assets/js'),  // Javascript input dir
    out_js: Path.join(process.cwd(), 'public/js')   // Javascript output dir
};

// For HMR and React Hot Loader
const hmrEntries = [
    // Webpack hot middleware
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&timeout=20000&reload=true',
    // React hot loader
    'react-hot-loader/patch'
];

// Default extension configuration
const defaultConfig = {
    // The URL of your Laravel dev server
    proxy: 'homestead.app',

    // List of relative paths (w.r.t '/resources/assets/js') of the input Javascript files
    // The list should be an object (key/value pair) and not an array
    inputFiles: [
        './app.js'
    ],

    // The relative path (w.r.t '/public/js') of the bundled JS output folder
    outputDir: './'
};

Elixir.extend('react', function (options) {
    // Set the options provided by user or use the default options
    options = _.merge(defaultConfig, options);

    // Will run only on 'gulp watch'
    if (Elixir.isWatching()) {
        setWebpackConfig(options);
        setBrowsersyncConfig(options);

        // Start browsersync
        browserSync.init(bsConfig);
    }

    new Elixir.Task('react', function () {
        if (Elixir.isWatching()) {
            this.recordStep('Starting Browsersync with webpack middleware');
        }
    }).watch();
});

function setWebpackConfig(options) {
    webpackConfig.context = PATHS.in_js;

    let outPath = Path.resolve(PATHS.out_js, options.outputDir);
    webpackConfig.output.path = outPath;
    let publicPath = Path.relative(Path.resolve(PATHS.out_js, '../'), outPath);
    webpackConfig.output.publicPath = "/" + publicPath.replace(/\\/g, '/') + "/";

    options.inputFiles.forEach(function (file) {
        let name = Path.basename(file, Path.extname(file));
        webpackConfig.entry[name] = hmrEntries.concat(file);
    });
}

function setBrowsersyncConfig(options) {
    let compiler = Webpack(webpackConfig);

    // Create middlewares for BrowserSync
    const wpDevMid = webpackDevMiddleware(compiler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        // Do not show detailed information
        noInfo: true,

        // pretty colored output
        stats: {
            colors: true,
            reasons: true,

            hash: false,

            version: true,
            timings: true,
            chunks: true,
            chunkModules: true,
            cached: false,
            cachedAssets: false
        }
    });
    const wpHotMid = webpackHotMiddleware(compiler);

    // Add proxy URL provided in gulpfile
    bsConfig.proxy = {
        target: options.proxy,
        middleware: [
            wpDevMid,
            wpHotMid
        ]
    };

    // Add host ip address provided in gulpfile
    if ("host" in options) {
        bsConfig.host = options.host;
    }
}
