angular.module("ngAudioSprite.service", []).factory("audioSprite", ["$http", function($http) {

    var audioSprite = {

        id: "",
        muted: false,
        volumeValue: 1,
        config: {},

        mute: function() {
            this.muted = true;
            notify("muted");
        },

        unmute: function() {
            this.muted = false;
            notify("muted");
        },

        volume: function(amount) {
            this.volumeValue = amount;
            notify("volumeValue");
        },

        play: function(id) {
            this.id = id;
            notify("id");
        },

        stop: function() {
            this.id = "";
            notify("id");
        },

        spritemap: function(spritemap) {
            this.config.spritemap = spritemap;
        },

        configure: function(config) {
            if (config && config.resources && config.spritemap) {
                this.config = config;
                notify("config");
            } else {
                throw "Invalid configuration object";
            }
        },

        load: function(file) {

            var self = this;

            $http.get(file).success(function(data) {
                self.config = data;
                self.config.path = getPath(file);
                notify("config");
            }).error(function() {
                throw "Failed to retrieve audio sprite configuration file: " + file;
            })
        },

        observe: observe,
        destroy: destroy

    };

    var observers = {};

    function getPath(url) {
        var parts = url.split("/");
        parts.splice(parts.length - 1, 1);
        return parts.join("/") + "/";
    }

    function notify(prop) {
        angular.forEach(observers[prop], function(observer){
            observer.callback.call(observer.scope, audioSprite[prop]);
        });
    }

    function observe(prop, callback, scope) {

        if (!observers[prop]) {
            observers[prop] = [];
        }

        observers[prop].push({
            callback: callback,
            scope: scope
        });
    }

    function destroy() {
        observers = {};
    }

    return audioSprite;

}]);