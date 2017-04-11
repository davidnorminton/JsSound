/*
 * @name js-sound
 * @author David Norminton
 * @link http://davenorm.me
 */
 
var JsSound = function(selector, name, file, event){
    "use strict";
    // array of possible selectors for checking against user input
    this.selectors = ['class', 'id'];
    // name of the class or id to add event listeners to
    this.selected = name;
    // set default event type for eventListener
    if ( event ) {
        this.event = event;
    } else {
        this.event = 'click';
    }    
    // check the selector is valid
    if ( this.selectors.indexOf(selector) ) {

        this.selector = selector;

    }
    this.that = this;
    // check browser support for sound file types
    // each property contains a bool
    this.support = {

        // bool support for mp3# 
        mp3 : this.mp3Exists(),
        // bool support for wav
        wav : this.wavExists(),
        // bool support for vorbis
        ogg : this.oggExists(),
        // bool support for aac
        aac : this.aacExists()

    };

    // array of sound file types supported by the browser
    this.files = [];

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
                this.files.push( file[i] );
            }
            i += 1;
        }
    // if the file parameter isn't an array it must be a string
    } else if ( typeof file === 'string' ) {
      
        // get the file extension
        type = this.getExt( file );
        // check it's supported by the browser
        if ( this.isSupported( type ) ) {

        }

    }
    // find elements and add event listeners
    (this.selector === 'id')? this.getElemById(this.selected)
                            : this.getElemsByClass(this.selected);

};

/*
@method getElemByid
*/
JsSound.prototype.getElemById = function ( el ) {
    var element = document.getElementById(el);
    this.addEvent( element );
}
/*
@method getElemsByClass
*/
JsSound.prototype.getElemsByClass = function ( el ) {
    var elements = document.getElementsByClassName( el );
    var i = 0; l = elements.length;
    for ( ; i < l; i +=1 ) {
        this.addEvent( elements[i] );
    }
}

/*
@method addEvent - add event listener to single target 
@param string element - the element to add event listener to
*/
JsSound.prototype.addEvent = function ( element ) {
    // can't use this on files[0] this is now the element !
    // so store file to play in variable
    var file = this.files[0];
    // add event listener with function to play file
    element.addEventListener( this.event, function(){
        var audio = new Audio( file );
        audio.play();   
    });
}

/*
@method addSound - add sound to event
*/
JsSound.prototype.addSound = function (file) {
    var audio = new Audio( file );
    audio.play();
}

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
