module.exports = function(grunt) {

    var sources = [
        "source/build/intro.js",
        "source/controllers/*.js",
        "source/app/*.js",
        "source/build/outro.js"
    ];

    var src = "dist/<%= pkg.name %>.src.js";
    var min = "dist/<%= pkg.name %>.min.js";
    var app = "app/js/<%= pkg.name %>.js";

    var tasks = ["concat", "uglify", "copy", "clean"];

    // config
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            build: {
                src: sources,
                dest: src
            }
        },
        uglify: {
            build: {
                src: [src],
                dest: min
            }
        },
        watch: {
            scripts: {
                files: sources,
                tasks: tasks
            }
        },
        copy: {
            main: {
                src: [min],
                dest: app
            }
        },
        clean: ["dist"]
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    // Default task(s).
    grunt.registerTask("default", tasks);
};