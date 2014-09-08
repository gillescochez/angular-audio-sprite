module.exports = function(config) {
    
    config.set({
    
        basePath: "../",
        
        files: [
            "app/bower_components/angular/angular.js",
            "source/*.js",
            "test/unit/**/*.js"
        ],
        
        autoWatch: true,
        
        frameworks: ["jasmine"],
        
        browsers: ["Chrome"],
        
        plugins: [
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-jasmine",
            "karma-junit-reporter"
        ],
        
        junitReporter: {
            outputFile: "test_out/unit.xml",
            suite: "unit"
        }
    
    });
};
