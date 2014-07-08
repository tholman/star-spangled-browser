

// http://stackoverflow.com/questions/1774846/how-to-search-replace-text-with-an-a-href-wrapper-in-javascript
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

var substring= 'tral';
findPlainText(document.body, substring, function(node, index) {
    node.splitText(index+substring.length);
    var span= document.createElement('span');
    span.appendChild(node.splitText(index));
    node.parentNode.insertBefore(span, node.nextSibling);
});