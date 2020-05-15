# TrackChanges.js 
![](https://i.ibb.co/qyG1j01/track-Changes-Logo-Min.png)

MutationObserver analog for all data types in JS.

 ******
#### Browser support
###### IE 9+
###### Firefox 20+
###### Chrome 30+
 ******
#### Installation
Find and download the file from the repository
``
events-js/***/build/events.min.js
``

include library file in html
```html
<script src="events.min.js"></script>
```

#### Usage example
```javascript
//------------------------Trigger event--------------------------------
const events = new Events();

let menuOpen = false;

events.add({
  menuOpen: () =>  {
    if (menuOpen === true) return true;
  }
});

function printText () {
  console.log('The menu open!');
}

events.on('menuOpen', printText);

//------------------------Morph event--------------------------------
const events = new Events();

events.add({
  widthСhange: () =>  {
    return document.querySelector('div').clientWidth;
  }
}, 'morph');

function printText () {
  console.log('Width has changed!');
}

events.on('widthСhange', printText);
```

### Methods
| Method name | Description                    |
| ------------- | ------------------------------ |
| `.add(Object: eventsDescriptions)`      |  Adds event descriptions. For an event type (TRIGGER) It takes an object, the key is the name of the event, and its value must be a function that should return (true) when the event occurred. |
| `.add(Object: eventsDescriptions, String: 'morph')`      |  Adds event descriptions. For an event type (MORPH) It takes an object, the key is the name of the event, and its value must be a function that must return an element that changes, when an item is changed, a callback function will be called. |
| `.remove(String: eventName)`   | Deletes the event description. Accepts the name of the event, clears all handlers that were bound via .on(). |
| `.on(String: eventName, Function: Callback, Boolean: onceMode)`     |Adds a listener. 1. Accepts the name of the event that was described using .add ().  2. Link to the function executed after the event.  3. Once mode, if true, then the listener will fire 1 time.|
| `.off(String: eventName, Function: Callback)`   | Removes all listeners. Accepts listener names and a callback function link. |
### DEV
```
$ git clone https://github.com/itmor/events-js.git
$ cd events-js/js
$ npm i
```

### Additionally
You can specify the event verification call speed in (ms)you can specify the event verification call speed in (ms).
 ******
```javascript
const events = new Events({
  workerCallInterval: 300
});
``` 
You can also use once mode so that the callback function that works only 1 time. 
Just pass the truth with the last argument when describing the event.
 ******
```javascript
events.add({
  triggered: () =>  {
    if (trigger === true) {
      return true;
     }
  }
}, true);
``` 
