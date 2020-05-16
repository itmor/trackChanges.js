# 👁️‍ TrackChanges.js 

  ![](https://img.shields.io/github/issues/itmor/trackChanges.js)  ![](https://img.shields.io/github/forks/itmor/trackChanges.js)   ![](https://img.shields.io/github/stars/itmor/trackChanges.js)      ![](https://img.shields.io/github/license/itmor/trackChanges.js)
##### Library for tracking changes in any data type

  - support browser and node-js
  - uses global space, you can control observers from any file
  - does not load, uses 1 global loop
  - easy to use and can be a replacement for MutationObserver in the browser


#### Support
###### Node.js 13+
###### Chrome 30+
******
#### Installation for node-js
```
npm i track-changes-js --save-dev
```
Include the library in a file
```Javascript
// create a class object
const TrackChanges = require('track-changes-js');
const trackChanges = new TrackChanges();
```
******
#### Installation for browser
```
git clone https://github.com/itmor/trackChanges.js.git
```
```
cd build
```
include library file in HTML page
```HTML
<script src="trackChanges.min.js"></script>
```
Include the library in a file
```Javascript
// create a class object
const trackChanges = new TrackChanges();
```
******
#### Usage example
```javascript
// tracked variable
let num = 1;

// add an observer, pass the name and function that returns the variable
trackChanges.addObserver('numObserv', () => num);

// add a handler, pass the name and function that will be called when changing "num"
trackChanges.addHandler('numObserv', numHandler);

/** 
create a function that will be called when the variable changes, the function argument will be its changed value 
**/
function numHandler(modifiedResult) {
  console.log(`Num changed to: ${modifiedResult}`)
}

```
