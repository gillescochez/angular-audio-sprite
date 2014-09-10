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
angular.module("ngAudioSprite.directive", []).directive("ngAudioSprite", ["audioSprite", function(audioSprite) {

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

        path = path || "";

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

            if (current.loop) {
                play();
            }
        }
    }

    function bindPlayer() {
        angular.element(player).on('timeupdate', onTimeUpdate);
    }

    function play(id) {

        if (map[id]) {

            current = map[id];
            player.currentTime = current.start;
            player.play();
        }
    }

    function stop() {
        player.pause();
    }

    function configure(config) {

        if (config.resources && config.spritemap) {
            setResource(config.resources, config.path);
            map = config.spritemap;
        }
    }

    function muted(value) {
        player.muted = value;
    }

    function volume(amount) {
        player.volume = amount;
    }

    return {

        restrict:"AEC",
        link: function(scope, element, attrs) {

            player = element[0];

            !type && detectType();

            bindPlayer();

            if (attrs.ngAudioSprite !== "") {

                audioSprite.load(attrs.ngAudioSprite);

                attrs.$observe("ng-audio-sprite", function(file) {
                    if (file) {
                        audioSprite.load(file);
                    }
                });
            }

            if (attrs.ngAudioSpritemap) {

                map = JSON.parse(attrs.ngAudioSpritemap);
                audioSprite.spritemap(map);

                attrs.$observe("ng-audio-spritemap", function(spritemap) {
                    if (spritemap) {
                        spritemap = JSON.parse(spritemap);
                        audioSprite.spritemap(spritemap);
                        map = spritemap;
                    }
                });
            }

            audioSprite.observe("volumeValue", volume, this);
            audioSprite.observe("muted", muted, this);
            audioSprite.observe("config", configure, this);
            audioSprite.observe("id", function(id) {
                if (id) {
                    play(id);
                } else {
                    stop();
                }
            }, this);

            scope.$on("$destroy", audioSprite.destroy)
        }

    };

}]);
angular.module("ngAudioSprite", [
    "ngAudioSprite.service",
    "ngAudioSprite.directive"
]);