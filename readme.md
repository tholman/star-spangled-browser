# Star Spangled Browser

Are you American? Do you know an American? Do you know of America?
If your answer is yes to any of these questions, then this chrome extension is for you!

Just add star spangled browser to chrome through the chrome web store [here](https://chrome.google.com/webstore/detail/star-spangled-browser/nmhhaohjnbippbdhfemgeiooacflcphi), and you'll never have to hover the word "america" again without feeling a full blast of American American'ness.
 
### Instructions

The app itself, is just installed freely through the [chrome web store](https://chrome.google.com/webstore/detail/star-spangled-browser/nmhhaohjnbippbdhfemgeiooacflcphi) ... The code itself is built to be widely customizable in terms of word assignments, gifs and sounds.

If you are customizing, you can load the app as an unpackaged extension for easy editing.

#### Customization

Customization is fairly easy, and is done in the `wordGifSoundAwesomeizer` file.

New assets go into the `assets` folder, within the `gif` and `mp3` directories respectively.

The `gifSets` and `soundSets` object, is where specific gifs are assigned to a key. The `wordAssignment` object assigns that key to the words you wish to activate the gifs and sounds.

For example:

```javascript
// Assign the beating dead horse gif to the 'design' set.
var gifSets = {
  'design': [
    'beating-dead-horse.gif'
  ]
}

// These words, will activate gifs in the design set.
var wordAssignments = {
  'design': [ 'almost flat design', 'flat design', 'skeuomorphism' ]
}
```

#### Packaging

If you have customized this repository, you will need to zip everything in this folder to submit to the chrome web store.
You will also need to change the name and icons in the manifest file. There is a deltailed explination [here](https://developer.chrome.com/webstore/publish).

### License

#### Code

The MIT License (MIT)

Copyright (C) 2014 ~ [Tim Holman](http://tholman.com) ~ timothy.w.holman@gmail.com

#### Assets

Music Samples & Gifs, owned by their respective creators.