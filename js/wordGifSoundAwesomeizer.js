if ( wordGifSoundAwesomeizer ) {
  wordGifSoundAwesomeizer.init();
} else {

var wordGifSoundAwesomeizer = (function() {

  'use strict';
  var body, container;
  var audio;

  var cursorImage = chrome.extension.getURL( '/assets/cursor.png' );
  var gifLocations   = '/assets/gif/';
  var soundLocations = '/assets/mp3/';
  var partying = false;

  var gifSets = {
    'american': [
      'holy-amazing.gif',
      'hulk-hogan.gif',
      'freedom.gif',
      'usa-usa.gif',
      'guns.gif',
      'nyan.gif'
    ]
  }

  var soundSets = {
    'american': [
      'star-spangled-banner.mp3',
      'red-tailed-hawk.mp3',
      'danger-zone.mp3',
      'born-usa.mp3',
      'america.mp3'
    ]
  }

  // Each word in the words set here, will assign actions to given gif & sound
  // sets, and then be randomized between each hover. 
  // -- Words should be all lower case!

  // Seriously though, go easy on these, lots of document scanning involved for each one!
  // Also, put longer words before shorter ones (ie: american before america );
  var wordAssignments = {
    'american': [ 'american', 'america', 'u.s.a' ]
  }
    
  /* -------------------------
  /*          UTILS
  /* -------------------------*/

  // Soft object augmentation
  function extend( target, source ) {

    for ( var key in source ) {
      if ( !( key in target ) ) {
        target[ key ] = source[ key ];
      }
    }
    
    return target;
  }

  // Applys a dict of css properties to an element
  function applyProperties( target, properties ) {

    for( var key in properties ) {
      target.style[ key ] = properties[ key ];
    }
  }

  /* -------------------------
  /*          App
  /* -------------------------*/

  // Initialize
  function init() {

    for ( var key in wordAssignments ) {
      var wordSet = wordAssignments[ key ];
      var wordCount = wordSet.length;

      // Scan through each individual word, in the word set.
      for( var j = 0; j < wordCount; j++ ) {
        var word = wordSet[j];

        findAndAssign( body, word, key );
      }         
    }
  }

  function assignLinks() {

    for ( var key in wordAssignments ) {
      var wordSet = wordAssignments[ key ];
      var wordCount = wordSet.length;

      // Assign gif urls
      var gifSet = gifSets[ key ];
      for( var i = 0; i < gifSet.length; i++ ) {
        gifSets[key][i] = chrome.extension.getURL( gifLocations + gifSets[key][i] );
      }

      // Asign mp3 urls
      var soundSet = soundSets[ key ];
      for( var i = 0; i < soundSet.length; i++ ) {
        soundSets[key][i] = chrome.extension.getURL( soundLocations + soundSets[key][i] );
      }
    }
  }

  function findAndAssign( element, word, wordKey ) {

    // For each child of the parent
    // -> If the child is a text node
    // -> -> Go through the child, and mark every index (of!) every keyword
    // -> -> -> Wrap a span around this word, and start tracking said span.
    // -> Else~If the child is not a text node.
    // -> -> Get recursive on this bad boy.

    // Node types being used:
    // 1: Element Node
    // 3: Text Node 

    for ( var i = element.childNodes.length; i > 0; i-- ) {
      
      var child = element.childNodes[i - 1];

      if ( child.nodeType === 1 && child.className !== 'awesome-span-that-loves-activating-stuff' ) { // We must go deeper!
        findAndAssign( child, word, wordKey );
      } else if ( child.nodeType === 3 ) { // Hot dog, a text node!
        var index = child.data.length;
        while ( true ) {
          index = child.data.toLowerCase().lastIndexOf( word, index );
          if ( index === -1 ) {
            break;
          }
          applySpan( child, index, word.length, wordKey );
        }
      }
    }
  }

  function applySpan( node, index, displacement, wordKey ) {
    
    node.splitText( index + displacement );
    var span = document.createElement( 'span' );
    span.appendChild( node.splitText( index ) );
    span.style.cursor = 'url(' + cursorImage + ') 5 5, auto';
    span.className = "awesome-span-that-loves-activating-stuff";

    node.parentNode.insertBefore( span, node.nextSibling );
    track( span, wordKey );
  }

  // Start tracking mouse hovers
  function track( element, wordKey ) {

    // Let the fun begin
    element.addEventListener( 'mouseover',    function() { getThisPartyStarted( wordKey ); }, false );
    element.addEventListener( 'mouseout',     function( event ) { sadlyStopPartying( event ); }, false );
  }

  // Create and cache the gif container.
  function createElements() {

    var containerProperties = {
      'backgroundPosition': '50% 50%',
      'backgroundSize': 'cover',
      'pointerEvents': 'none',
      'zIndex': '2147483647', // Take it to the max!
      'position': 'fixed',
      'display': 'none',
      'height': '100%',
      'width': '100%',
      'margin': '0px',
      'left': '0px',
      'top': '0px',
    }

    container = document.createElement( 'div' );
    applyProperties( container, containerProperties );
    body.appendChild( container );

    audio = document.createElement( 'audio' );
    audio.loop = true;
    audio.autoplay = true;
    audio.setAttribute( 'src', '' );
  }

  // Add the background to the container, and the container to the page!
  function getThisPartyStarted( key ) {

    console.log( 'enter' );
    if( partying === false ) {
      
      // Gifs
      var set = gifSets[ key ];
      var gif = set[ Math.floor( Math.random() * set.length ) ]; // Random gif from set!
      container.style[ 'backgroundImage' ] = 'url(' + gif + ')';
      container.style[ 'display' ] = 'block';

      // Audio
      var soundSet = soundSets[ key ];
      var mp3 = soundSet[ Math.floor( Math.random() * soundSet.length ) ]; // Random gif from set!
      audio.setAttribute( 'src', mp3 );

      partying = true;
    }
  }


  // Hide the container
  function sadlyStopPartying( event ) {

    console.log( "stop", event.toElement.className );
    // Don't stop the music, nobody can stop the music.
    if( event.toElement.className === 'awesome-span-that-loves-activating-stuff' ){
      return;
    }

    container.style[ 'backgroundImage' ] = '';
    container.style[ 'display' ] = 'none';
    audio.setAttribute( 'src', '' );
    partying = false;
  }


  function main( elements, options ) {

    // Caching & init
    body = document.body;
    createElements();
    assignLinks();
    init();
  }

  return extend( main, {
    init: init
  });

})();

wordGifSoundAwesomeizer();

}