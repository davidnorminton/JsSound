/*
 * @name JsSound
 * @author David Norminton
 * @link http://davenorm.me
 */
class JsSound {


    selectors: string[];
    selected: string;
    support: any;
    safeFiles: string[];

    constructor(
        public selector: string, 
        public name: string, 
        public files: string[], 
        public event: string = 'click'
    ) {
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
        const self = this;
        if (Array.isArray(files)) {
            files.forEach(function(file) {
               let type = self.getExt(file);
                if (self.isSupported(type)) {        
                    self.safeFiles.push(file);
                }
            });
        } else if (typeof files === 'string') {  
            let type = this.getExt(files);
            if (this.isSupported(type)) {
                this.safeFiles.push(files);
            }

        }

        if (this.selector === 'id') {
            this.getElemById(this.selected);
        } else {
            this.getElemsByClass(this.selected);
        } 
    }

    /*
     * @method getElemByid
     */
    getElemById(el: string): void {
        this.addEvent(document.getElementById(el));
    }

    /*
     * @method getElemsByClass
     */
    getElemsByClass(el: string): void {
        var elements = document.getElementsByClassName( el );
        var i = 0, l = elements.length;
        for ( ; i < l; i +=1 ) {
            this.addEvent( elements[i] );
        }
    }

    /*
     * @method addEvent - add event listener to single target 
     * @param string element - the element to add event listener to
     */
    addEvent(element: any): void  {
        const file = this.files[0];
        element.addEventListener(this.event, function(){
            const audio = new Audio( file );
            audio.play();   
        });
    }

    /*
     * @method isSupported - does the browser support the file type
     * @param string type - the file type to check for
     * @return bool
     */
    isSupported(type: string): boolean {
        return this.support[type];
    }

    /*
     * @method - geExt - get the file extension
     * @param string file - the file to extract extension from
     */
    getExt(file: string): string {
        return file.substring(file.lastIndexOf(".") + 1);
    }

    /**
     * audioElem
     * @return html audio element
     */
    audioElem():HTMLAudioElement {
        return document.createElement('audio');
    }

    // check for <audio> in MP3 format #
    mp3Exists(): boolean {
        return !!(
            this.audioElem().canPlayType && 
            this.audioElem().canPlayType('audio/mpeg;').replace(/no/, '')
        );
    }

    // check for <audio> in Vorbis format
    oggExists(): boolean {
        return !!(
            this.audioElem().canPlayType && 
            this.audioElem().canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '')
        );
    }

    // check for <audio> in WAV format #
    wavExists(): boolean {
        return !!(
            this.audioElem().canPlayType && 
            this.audioElem().canPlayType('audio/wav; codecs="1"').replace(/no/, '')
        );
    }

    // check for <audio> in AAC format #
    // Low-Complexity AAC audio in MP4 container
    aacExists(): boolean {
        return !!(
            this.audioElem().canPlayType && 
            this.audioElem().canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, '')
        );
    }
}