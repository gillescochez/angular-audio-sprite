angular.module("ngAudioSprite.service", []).factory("audioSprite", ["$http", function($http) {

    var audioSprite = {

        id: "",
        config: {},

        play: function(id) {
            this.id = id;
            notifyObservers("id");
        },

        stop: function() {
            this.id = "";
            notifyObservers("id");
        },

        spritemap: function(spritemap) {
            this.config.spritemap = spritemap;
        },

        configure: function(config) {
            if (config && config.resources && config.spritemap) {
                this.config = config;
                notifyObservers("config");
            } else {
                throw "Invalid configuration object";
            }
        },

        load: function(file) {

            var self = this;

            $http.get(file).success(function(data) {
                self.config = data;
                self.config.path = getPath(file);
                notifyObservers("config");
            }).error(function() {
                throw "Failed to retrieve audio sprite configuration file: " + file;
            })
        },

        observe: addObserver,
        removeObservers: removeObservers

    };

    var observers = {};

    function getPath(url) {
        var parts = url.split("/");
        parts.splice(parts.length - 1, 1);
        return parts.join("/") + "/";
    }

    function notifyObservers(prop) {
        angular.forEach(observers[prop], function(observer){
            observer.callback.call(observer.scope);
        });
    }

    function addObserver(prop, callback, scope) {

        if (!observers[prop]) {
            observers[prop] = [];
        }

        observers[prop].push({
            callback: callback,
            scope: scope
        });
    }

    function removeObservers() {
        observers = {};
    }

    return audioSprite;

}]);