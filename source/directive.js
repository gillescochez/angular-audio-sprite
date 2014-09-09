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

    function play(id) {

        if (map[id]) {

            current = map[id];
            player.currentTime = current.start;
            player.play();
        }
    }

    return {

        restrict:"AEC",
        link: function(scope, element, attr) {

            player = element[0];

            !type && detectType();

            bindPlayer();

            scope.$watch(function() { return audioSprite.config }, function(config) {

                if (config.resources && config.spritemap) {
                    setResource(config.resources, config.path);
                    map = config.spritemap;
                }
            });

            scope.$watch(function() { return audioSprite.id }, function(id) {
                id && play(id);
            });

        }

    };

}]);