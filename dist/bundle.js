(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsSound", function() { return JsSound; });
/*
 * @name JsSound
 * @author David Norminton
 * @link http://davenorm.me
 */
class JsSound {
    constructor(selector, name, files, event = 'click') {
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
        const self = this;
        if (Array.isArray(files)) {
            files.forEach(function (file) {
                let type = self.getExt(file);
                if (self.isSupported(type)) {
                    self.safeFiles.push(file);
                }
            });
        }
        else if (typeof files === 'string') {
            let type = this.getExt(files);
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
    getElemById(el) {
        this.addEvent(document.getElementById(el));
    }
    /*
     * @method getElemsByClass
     */
    getElemsByClass(el) {
        var elements = document.getElementsByClassName(el);
        var i = 0, l = elements.length;
        for (; i < l; i += 1) {
            this.addEvent(elements[i]);
        }
    }
    /*
     * @method addEvent - add event listener to single target
     * @param string element - the element to add event listener to
     */
    addEvent(element) {
        const file = this.files[0];
        element.addEventListener(this.event, function () {
            const audio = new Audio(file);
            audio.play();
        });
    }
    /*
     * @method isSupported - does the browser support the file type
     * @param string type - the file type to check for
     * @return bool
     */
    isSupported(type) {
        return this.support[type];
    }
    /*
     * @method - geExt - get the file extension
     * @param string file - the file to extract extension from
     */
    getExt(file) {
        return file.substring(file.lastIndexOf(".") + 1);
    }
    /**
     * audioElem
     * @return html audio element
     */
    audioElem() {
        return document.createElement('audio');
    }
    // check for <audio> in MP3 format #
    mp3Exists() {
        return !!(this.audioElem().canPlayType &&
            this.audioElem().canPlayType('audio/mpeg;').replace(/no/, ''));
    }
    // check for <audio> in Vorbis format
    oggExists() {
        return !!(this.audioElem().canPlayType &&
            this.audioElem().canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
    }
    // check for <audio> in WAV format #
    wavExists() {
        return !!(this.audioElem().canPlayType &&
            this.audioElem().canPlayType('audio/wav; codecs="1"').replace(/no/, ''));
    }
    // check for <audio> in AAC format #
    // Low-Complexity AAC audio in MP4 container
    aacExists() {
        return !!(this.audioElem().canPlayType &&
            this.audioElem().canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''));
    }
}


/***/ })
/******/ ]);
});