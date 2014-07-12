//WIP!

// http://stackoverflow.com/questions/1774846/how-to-search-replace-text-with-an-a-href-wrapper-in-javascript




var wordGifSoundAwesomeizer = (function() {

  'use strict';
  var body;
  var container;

  var gifLocations   = './assets/gif/';
  var soundLocations = './assets/mp3/';

  var partying = false;


  var gifSets = {
    'american': [
      // 'hidden-gun.gif',
      chrome.extension.getURL("./assets/gif/hidden-gun.gif"),
      chrome.extension.getURL("./assets/gif/hulk-hogan.gif"),
      chrome.extension.getURL("./assets/gif/freedom.gif"),
      chrome.extension.getURL("./assets/gif/guns.gif")
      // 'hulk-hogan.gif',
      // 'freedom.gif',
      // 'guns.gif'
    ]
  }

  var soundSets = {
    'american': [
      'highway-to-the-dangerzone.mp3',
      'star-spangled-banner.mp3',
      'born-in-the-usa.mp3'
    ]
  }

  // Each word in the words set here, will assign actions to given gif & sound
  // sets, and then be randomized between each hover. 
  // -- Words should be all lower case!

  // Seriously though, go easy on these, lots of document scanning involved!
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

      if ( child.nodeType === 1 ) { // We must go deeper!
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
    span.style.backgroundColor = '#ff0000';
    node.parentNode.insertBefore( span, node.nextSibling );
    track( span, wordKey );
  }

  // Start tracking mouse hovers
  function track( element, wordKey ) {

    // Let the fun begin
    element.addEventListener( 'mouseover',    function() { getThisPartyStarted( wordKey ); }, false );
    element.addEventListener( 'mouseout',     function() { sadlyStopPartying(); }, false );
  }

  // Create and cache the gif container.
  function createContainer() {

    var containerProperties = {
      'backgroundPosition': '50% 50%',
      'backgroundSize': 'cover',
      'pointerEvents': 'none',
      'position': 'fixed',
      'zIndex': '999999',
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
  }

  // Add the background to the container, and the container to the page!
  function getThisPartyStarted( key ) {

    if( partying === false ) {
      
      var set = gifSets[ key ];
      var gif = set[ Math.floor( Math.random() * set.length ) ]; // Random gif from set!
      container.style[ 'backgroundImage' ] = 'url(' + gif + ')';
      container.style[ 'display' ] = 'block';
      partying = true;
    }
  }


  // Hide the container
  function sadlyStopPartying() {
    container.style[ 'display' ] = 'none';
    container.style[ 'backgroundImage' ] = '';
    partying = false;
  }


  function main( elements, options ) {

    // Caching & init
    body = document.body;
    createContainer();
    init();
  }

  return extend( main, {
      
  });

})();

wordGifSoundAwesomeizer();