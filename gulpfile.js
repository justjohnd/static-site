const plugins = require('gulp-load-plugins');
const gulp = require('gulp');
const del = require('delete');
const webpackStream = require('webpack-stream');
const webpack2 = require('webpack');
const yargs = require('yargs');
const named = require('vinyl-named');
const browser = require('browser-sync');
const autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const panini = require('panini');
const i18n = require('gulp-html-i18n');
// const env = require('dotenv').config(); Currently not using
// const Dotenv = require('dotenv-webpack');

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!yargs.argv.production;

const PORT = 1000;

const PATHS = {
  DIST: 'dist',
  ASSETS: 'dist/assets',
};

gulp.task(
  'build',
  gulp.series(clean, gulp.parallel(javascript, sass, image, minifyHTML))
);

gulp.task('default', gulp.series('build', server, watch));

// Optimize image size
function image() {
  return gulp
    .src('src/img/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest(`${PATHS.ASSETS}/img`));
}

// Remove dist folder before building
function clean(done) {
  del([PATHS.DIST], done);
}

function sass() {
  const postCssPlugins = [
    // Autoprefixer
    autoprefixer(),

    // UnCSS - Uncomment to remove unused styles in production
    // PRODUCTION && uncss.postcssPlugin(UNCSS_OPTIONS),
    cssnano(),
  ].filter(Boolean);

  return gulp
    .src([
      'src/sass/styles.scss',
      'node_modules/@fortawesome/fontawesome-free/css/all.css',
    ])
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        includePaths: '[]', // add paths to any 3rd party styles here
      }).on('error', $.sass.logError)
    )
    .pipe($.postcss(postCssPlugins))
    .pipe(
      $.if(
        PRODUCTION,
        $.cleanCss({
          compatibility: 'ie9',
        })
      )
    )
    .pipe($.if(!PRODUCTION, $.sourcemaps.write())) //Why doesn't a .map file show in assets?
    .pipe(gulp.dest(`${PATHS.ASSETS}/css`))
    .pipe(
      browser.reload({
        stream: true,
      })
    );
}

let webpackConfig = {
  mode: PRODUCTION ? 'production' : 'development',
  module: {
    // exports: {
    //     plugins: [
    //             new Dotenv()
    //         ]
    // },
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            compact: false,
          },
        },
      },
    ],
  },
  devtool: !PRODUCTION && 'source-map',
};

function javascript() {
  return gulp
    .src('src/js/**/*')
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe(
      $.if(
        PRODUCTION,
        $.terser().on('error', (e) => {
          console.log(e);
        })
      )
    )
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(`${PATHS.ASSETS}/js`));
}

//  HTML Minify
function minifyHTML() {
  return gulp
    .src('src/partials/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest(`${PATHS.DIST}`));
}
exports.minifyHTML = minifyHTML;

function server(done) {
  browser.init(
    {
      server: PATHS.DIST,
      port: PORT,
    },
    done
  );
}

function watch() {
  gulp.watch('./**/*.img').on('all', image); // Bug: will update the file but need to manually reload
  gulp.watch('src/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/**/*.scss').on('all', sass);
  gulp
    .watch(['src/**/*.html', 'index.html'])
    .on('all', gulp.series(minifyHTML, browser.reload));
}

// Clear cache

function clearCache(done) {
  return cache.clearAll(done);
}
