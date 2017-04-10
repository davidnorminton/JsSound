/*
 * @name js-sound
 * @author David Norminton
 * @link http://davenorm.me
 */
 
var JsSound = function(selector, id, file){
    "use strict";
    this.selectors = ['class', 'id'];

    if ( this.selectors.indexOf(selector) ) {

        this.selector = selector;

    } else {

        this.debug('selector', selector);

    }

    this.id = id;

    // check browser support for sound file types
    // each property contains a bool
    this.support = {

        // bool support for mp3
        mp3 : this.mp3Exists(),
        // bool support for wav
        wav : this.wavExists(),
        // bool support for vorbis
        ogg : this.oggExists(),
        // bool support for aac
        aac : this.aacExists()
    };

    // array of sound file types supported by the browser
    this.fileExts = [];

    var l = file.length, i = 0, type;

    // file can be either a single sound file
    // or an array of files which are available to be used
    // loop over array and get file types and see if the browser
    // supports them
    if ( Array.isArray(file) ) {

        // loop over the files and check browser support
        while ( i < l ) {
            // extract file extension from file
            type = this.getExt( file[i] );
            // if the browser supports the type add to this.fileExts array
            if ( this.isSupported( type ) ) {
                this.fileExts.push( type );
            }
            i += 1;
        }

    } else {

        if ( typeof file === 'string' ) {

            type = this.getExt( file );

            if ( this.isSupported( type ) ) {
                this.fileExts.push( type );
            }

        }
    }

    
    var click = document.getElementById(id);

    click.addEventListener('click', function(){
        // play file
        var audio = new Audio(file[0]);
        audio.play();
    });
};

/*
@method isSupported - does the browser support the file type
@param string type - the file type to check for
@return bool
*/
JsSound.prototype.isSupported = function ( type ) {
    return this.support[type];
}

/*
@method - geExt - get the file extension
@param string file - the file to extract extension from
@return string - the extension
*/
JsSound.prototype.getExt = function ( file ) {
    return file.substring(file.lastIndexOf(".")+1);
}

// check for <audio> in MP3 format #
JsSound.prototype.mp3Exists = function() {
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}

// check for <audio> in Vorbis format #
JsSound.prototype.oggExists = function() {
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
}

// check for <audio> in WAV format #
JsSound.prototype.wavExists = function() {
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''));
}

// check for <audio> in AAC format #
// Low-Complexity AAC audio in MP4 container
JsSound.prototype.aacExists = function() {
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''));
}

// debug script
JsSound.prototype.debug = function(error, msg) {
    var usage = "JsSound(SELECTOR_TYPE, SELECTOR_NAME, FILE(ARRAY OR STRING, EVENT_TYPE(OPTIONAL))";
    switch(error) {
        case 'selector' :
            console.log('Unknown type of selector ' + selector);
            console.log(usage);
            break;
    }
}
