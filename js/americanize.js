

// http://stackoverflow.com/questions/1774846/how-to-search-replace-text-with-an-a-href-wrapper-in-javascript




var Americanizer = (function() {

  'use strict';
  var body;
  var container;
    
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

  	var substring= 'trali';
	findPlainText(document.body, substring, function(node, index) {
	    node.splitText(index+substring.length);
	    var span= document.createElement('span');
	    span.appendChild(node.splitText(index));
	    node.parentNode.insertBefore(span, node.nextSibling);
	});

  }

function findPlainText(element, substring, callback) {
    for (var childi= element.childNodes.length; childi-->0;) {
        var child= element.childNodes[childi];
        if (child.nodeType===1) {
            findPlainText(child, substring, callback);
        } else if (child.nodeType===3) {
            var index = child.data.length;
            while (true) {
                index = child.data.lastIndexOf(substring, index);
                if (index===-1)
                    break;
                callback.call(window, child, index)
            }
        }
    }
}

  // Start tracking mouse hovers
  function track( element ) {

    // Let the fun begin
    element.addEventListener( 'mouseover',    function() { startLovingAmerica(); }, false );
    element.addEventListener( 'mouseout',     function() { stopParting();   }, false );
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
  function startLovingAmerica() {
  }

  // Hide the container
  function stopPartying() {
    container.style[ 'display' ] = 'none';
    container.style[ 'backgroundImage' ] = '';
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

Americanizer();