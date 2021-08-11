let project_folder = "dist";
let source_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
  },
  src: {
    html: source_folder + "/*.html",
    css: source_folder + "/sass/style.sass",
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/sass/**/*.sass",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    css2: source_folder + "/css/*.css"
  },
  clean: "/" + project_folder + "/"
};

const {src, dest} = require("gulp");
const gulp = require("gulp");
const browserSync = require("browser-sync");
const del = require("del");
const uglify = require("gulp-uglify-es").default;

gulp.task("server",  function() {
  browserSync.init({
    server: {
      baseDir: project_folder,
    }
  });
});

gulp.task("html", function() {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function() {
  return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
});

gulp.task("watchFiles", function() {
  gulp.watch(path.watch.html, gulp.parallel("html"));
  gulp.watch(path.watch.js, gulp.parallel("scripts"));
});

gulp.task ("cleanAll", function() {
  return del(path.clean);
});

gulp.task("default", gulp.series("cleanAll", gulp.parallel("server", "html", "scripts", "watchFiles")));