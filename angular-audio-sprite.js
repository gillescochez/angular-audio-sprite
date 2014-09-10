angular.module("ngAudioSprite.directive", []).directive("audioSprite", ["audioSprite", function(audioSprite) {

    var player;
    var map = {};
    var current = {};
    var types = ["ogg","m4a","mp3", "ac3", "caf"];
    var type = "";

    function detectType() {

        var length = types.length;
        var i = 0;

        if (player.canPlayType) {

            for (; i < length; i++) {
                if (player.canPlayType("audio/" + types[i]) !== "") {
                    type = types[i];
                    return;
                }
            }

        } else {
            throw "ngAudioSprite: Browser not supported!";
        }
    }

    function setResource(resources, path) {

        var source = angular.element(player).children()[0] || document.createElement("source");
        var extension = "." + type;
        var length = resources.length;
        var i = 0;

        if (!source.type || source.type !== type) {
            source.type = "audio/" + type;
        }

        for (; i < length; i++) {
            if (resources[i].substr(-4) === extension) {
                if (!source.src) {
                    player.appendChild(source);
                }
                source.src = path + resources[i];
                return;
            }
        }
    }

    function onTimeUpdate() {
        if (player.currentTime >= current.end) {
            player.pause();
        }
    }

    function bindPlayer() {
        angular.element(player).on('timeupdate', onTimeUpdate);
    }

    function play() {

        var id = audioSprite.id;

        if (map[id]) {

            current = map[id];
            player.currentTime = current.start;
            player.play();
        }
    }

    function stop() {
        player.pause();
    }

    function configure() {

        var config = audioSprite.config;

        if (config.resources && config.spritemap) {
            setResource(config.resources, config.path);
            map = config.spritemap;
        }
    }

    return {

        restrict:"AEC",
        link: function(scope, element) {

            player = element[0];

            !type && detectType();

            bindPlayer();

            audioSprite.addObserver("config", configure, this);
            audioSprite.addObserver("id", function() {
                if (audioSprite.id) {
                    play();
                } else {
                    stop();
                }
            }, this);

            scope.$on("$destroy", audioSprite.removeObservers)
        }

    };

}]);
angular.module("ngAudioSprite", [
    "ngAudioSprite.service",
    "ngAudioSprite.directive"
]);
angular.module("ngAudioSprite.service", []).factory("audioSprite", ["$http", function($http) {

    var audioSprite = {

        id: "",
        config: {},

        configure: function(config) {
            if (config && config.resources && config.path && config.spritemap) {
                this.config = config;
                notifyObservers("config");
            } else {
                throw "Invalid configuration object";
            }
        },

        play: function(id) {
            this.id = id;
            notifyObservers("id");
        },

        stop: function() {
            this.id = "";
            notifyObservers("id");
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

        addObserver: addObserver,
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