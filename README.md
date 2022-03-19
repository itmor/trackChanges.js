I'm a developer from Ukraine 🇺🇦  
Russia started a war, invaded my country, destroyed the entire infrastructure of my city, kills civilians and drops bombs on residential areas.
I live in the city of Kherson. and I am under occupation, these Russian pigs do not allow humanitarian corridors to pass.  
They kill and starve the inhabitants.
Here are shots of what they are doing to our cities
![](https://focus.ua/static/storage/originals/2/ee/b9a33181851682dffeed5cbc8322bee2.jpg)

![](https://spektr.press/wp-content/uploads/2022/03/47rs220301a846-2048x1353.jpg)


![](https://firstregion.com.ua/wp-content/uploads/2022/03/screenshot_2022-03-02-13-40-41-00_1c337646f29875672b5a61192b9010f9.jpg)
![](https://cdn.segodnya.ua/i/image_728x410/media/image/622/364/3ad/6223643adee31.png.webp)
![](https://pbs.twimg.com/media/FM9R4gSXsAMsUD9?format=jpg&name=4096x4096)

Russians are worse than the Nazis.
Russians are not people, they are terrorists.

![](https://pbs.twimg.com/media/FNMfce1X0A0zcQV.jpg)
![](https://www.aljazeera.com/wp-content/uploads/2022/02/h_57506019.jpg?resize=1200%2C630)


I call on everyone to obstruct and boycott Russia 🇷🇺. Russian software. People from Russia.
For only the citizens of Russia are to blame for the deaths of tens of thousands of people. 75% of Russians support the war in Ukraine and the invasion of other European countries


Thanks to all countries for supporting Ukraine. Victory is ours!  🇺🇦  

# 👁️‍ TrackChanges.js 

  ![](https://img.shields.io/github/issues/itmor/trackChanges.js)  ![](https://img.shields.io/github/forks/itmor/trackChanges.js)   ![](https://img.shields.io/github/stars/itmor/trackChanges.js)      ![](https://img.shields.io/github/license/itmor/trackChanges.js)
##### Library for tracking changes in any data type

  - support browser and node-js
  - uses global space, you can control observers from any file
  - does not load, uses 1 global loop
  - easy to use and can be a replacement for MutationObserver in the browser
******
### Installation for node-js
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
### Installation for browser
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
### Usage example
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
  console.log(`Num changed to: ${ modifiedResult }`);
}
```
### Importantly 
```
Each observer must have a unique name.
You can create an unlimited number of observer handlers
```
******
### Description of public methods
|  methods |   description|
| ------------ | ------------ |
|   addObserver(name: string, valueFunc: function)|The method creates an observer, takes a unique name and a function for returning the observed value |
|   removeObserver(name: string)|The method removes the observer, accepts the name of the previously created observation|
|   addHandler(name: string, callback: function)|The method adds a handler for the observer. Accepts the name of the previously created observer and callback function. When the callback value is changed, the callback function is launched and its argument will be equal to the changed value|
|   removeHandler(name: string, callback: function)|The method removes the handler for the observer. Accepts the observer name and callback function that was used when adding the handler|
|   getObserverStruct(name: string)|With this method you can get the observer structure, output data { name: string; value: function; oldValue: any; removed: boolean; callbacks: Array<Function>}|
|   getAllObserversStruct()|With this method you can get the structure in all available observers, output data Array<{ name: string; value: function; oldValue: any; removed: boolean; callbacks: Array<Function>}>|

### Dev
Establish dependency
```
npm i
```
Run assembly processing
```
npm run start
```
