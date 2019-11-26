# Events-js
Small library for creating and listening for js events
#### Installation in JavaScript
Find and download the file from the repository
``
events-js/js/build/events.min.js
``

include library file in html
```html
<script src="events.min.js"></script>
```

#####Usage example
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

events.on('triggered', printText );
```

#### Installation in JQuery
Find and download the file from the repository
``
events-js/jquery/build/events.min.js
``

include library file in html
```html
<script src="events.min.js"></script>
```

#####Usage example
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

events.on('triggered', printText );
```
