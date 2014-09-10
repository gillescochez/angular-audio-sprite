module.exports = function(grunt) {

    var sources = [
        "source/service.js",
        "source/directive.js",
        "source/module.js"
    ];

    var src = "<%= pkg.name %>.js";
    var min = "<%= pkg.name %>.min.js";

    var tasks = ["concat", "uglify"];

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
        }
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Default task(s).
    grunt.registerTask("default", tasks);
};