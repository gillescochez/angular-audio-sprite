angular.module("ngAudioSprite.directive", []).directive("audioSprite", ["audioSprite", function(audioSprite) {

    var player;
    var map = {};
    var current = {};
    var types = ["ogg","m4a","mp3", "ac3"];
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

        var source = document.createElement("source");
        var extension = "." + type;
        var length = resources.length;
        var i = 0;

        source.type = "audio/" + type;

        for (; i < length; i++) {
            if (resources[i].substr(-4) === extension) {
                source.src = path + resources[i];
                player.appendChild(source);
                return;
            }
        }
    }

    function getPath(url) {
        var parts = url.split("/");
        parts.splice(parts.length - 1, 1);
        return parts.join("/") + "/";
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

            if (!type) {
                detectType();
            }

            bindPlayer();

            audioSprite.getSprite(attr.audioSprite).success(function(data) {

                map = data.spritemap;

                setResource(data.resources, getPath(attr.audioSprite));

                scope.$watch(function() { return audioSprite.id }, function(id) {
                    id && play(id);
                });

            });

        }

    };

}]);