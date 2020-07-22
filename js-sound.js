"use strict";
/*
 * @name JsSound
 * @author David Norminton
 * @link http://davenorm.me
 */
var Sound = /** @class */ (function () {
    function JsSound(selector, name, files, event) {
        if (event === void 0) { event = 'click'; }
        this.selector = selector;
        this.name = name;
        this.files = files;
        this.event = event;
        // array of sound file types supported by the browser
        this.safeFiles = [];
        // array of possible selectors for checking against user input
        this.selectors = ['class', 'id'];
        // name of the class or id to add event listeners to
        this.selected = name;
        // check the selector is valid
        if (this.selectors.indexOf(selector)) {
            this.selector = selector;
        }
        // check browser support for sound file types
        // each property contains a bool
        this.support = {
            mp3: this.mp3Exists(),
            wav: this.wavExists(),
            ogg: this.oggExists(),
            aac: this.aacExists()
        };
        var self = this;
        if (Array.isArray(files)) {
            files.forEach(function (file) {
                var type = self.getExt(file);
                if (self.isSupported(type)) {
                    self.safeFiles.push(file);
                }
            });
        }
        else if (typeof files === 'string') {
            var type = this.getExt(files);
            if (this.isSupported(type)) {
                this.safeFiles.push(files);
            }
        }
        if (this.selector === 'id') {
            this.getElemById(this.selected);
        }
        else {
            this.getElemsByClass(this.selected);
        }
    }
    /*
     * @method getElemByid
     */
    JsSound.prototype.getElemById = function (el) {
        this.addEvent(document.getElementById(el));
    };
    /*
     * @method getElemsByClass
     */
    JsSound.prototype.getElemsByClass = function (el) {
        var elements = document.getElementsByClassName(el);
        var i = 0, l = elements.length;
        for (; i < l; i += 1) {
            this.addEvent(elements[i]);
        }
    };
    /*
     * @method addEvent - add event listener to single target
     * @param string element - the element to add event listener to
     */
    JsSound.prototype.addEvent = function (element) {
        // can't use this on files[0] this is now the element !
        // so store file to play in variable
        var file = this.files[0];
        // add event listener with function to play file
        element.addEventListener(this.event, function () {
            var audio = new Audio(file);
            audio.play();
        });
    };
    /*
     * @method isSupported - does the browser support the file type
     * @param string type - the file type to check for
     * @return bool
     */
    JsSound.prototype.isSupported = function (type) {
        return this.support[type];
    };
    /*
     * @method - geExt - get the file extension
     * @param string file - the file to extract extension from
     */
    JsSound.prototype.getExt = function (file) {
        return file.substring(file.lastIndexOf(".") + 1);
    };
    /**
     * audioElem
     * @return html audio element
     */
    JsSound.prototype.audioElem = function () {
        return document.createElement('audio');
    };
    // check for <audio> in MP3 format #
    JsSound.prototype.mp3Exists = function () {
        return !!(this.audioElem().canPlayType &&
            this.audioElem().canPlayType('audio/mpeg;').replace(/no/, ''));
    };
    // check for <audio> in Vorbis format
    JsSound.prototype.oggExists = function () {
        return !!(this.audioElem().canPlayType &&
            this.audioElem().canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
    };
    // check for <audio> in WAV format #
    JsSound.prototype.wavExists = function () {
        return !!(this.audioElem().canPlayType &&
            this.audioElem().canPlayType('audio/wav; codecs="1"').replace(/no/, ''));
    };
    // check for <audio> in AAC format #
    // Low-Complexity AAC audio in MP4 container
    JsSound.prototype.aacExists = function () {
        return !!(this.audioElem().canPlayType &&
            this.audioElem().canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''));
    };
    return JsSound;
}());
