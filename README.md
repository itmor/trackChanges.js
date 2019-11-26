# Events-js ![](https://svgshare.com/i/GR1.svg)
Small library for creating and listening for js events
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
const events = new Events();

let trigger = false;

events.add({
  triggered: () =>  {
    if (trigger === true) {
      return true;
     }
  }
});

function printText () {
  console.log('Еhe trigger worked!');
}

events.on('triggered', printText);
```
