module.exports = {
    // Loader results would be cached for future use
    cacheDirectory: true,
    // Do not use .babelrc file
    babelrc: false,
    presets: [ 'es2015', 'stage-0', 'react' ],
    plugins: [ 'react-hot-loader/babel' ]
};
