describe("angular audio sprite directive", function() {

    var $rootScope;
    var $compile;

    beforeEach(module("ngAudioSprite.service"));
    beforeEach(module("ngAudioSprite.directive"));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get("$rootScope");
        $compile = $injector.get("$compile");
    }));

    it("should GET request the JSON configuration", inject(function(audioSprite) {

        var element = $compile('<audio audio-sprite="sprite.json"></audio>')($rootScope);

        audioSprite.path = "app/audio/";
        audioSprite.config = {
            "resources": [
                "sprite.ogg",
                "sprite.m4a",
                "sprite.mp3",
                "sprite.ac3"
            ],
            "spritemap": {
                "round-final": {
                    "start": 0,
                    "end": 1.92,
                    "loop": false
                },
                "round1": {
                    "start": 3,
                    "end": 4.824013605442177,
                    "loop": false
                }
            }
        };

    }));

});