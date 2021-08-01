(() => {
  const TrackChanges = require('../../build/trackChanges.min.js');
  const trackChanges = new TrackChanges();

  // Track variable changed
  let variable = 1;
  trackChanges.addObserver('variable', () => variable);
  trackChanges.addHandler('variable', variableHandler);

  function variableHandler(modifiedResult) {
    console.log(`Variable changed to: ${modifiedResult}`);
    variable = 1;
  }

  setTimeout(() => {
    variable = 0;
  }, 3000);

  // Track object key changed
  let object = { user: 'root' };
  trackChanges.addObserver('object', () => object.user);
  trackChanges.addHandler('object', objectHandler);

  function objectHandler(modifiedResult) {
    console.log(`Object key changed to: ${modifiedResult}`);
  }

  setTimeout(() => {
    object.user = 'alex';
  }, 4000);

  // GET OBSERVER STRUCT BY NAME
  setTimeout(() => {
    console.log('Get "variable" observer struct by name', trackChanges.getObserverStruct('variable'));
  }, 7000);

  // GET OBSERVER STRUCT BY NAME
  setTimeout(() => {
    console.log('All observers struct', trackChanges.getAllObserversStruct());
  }, 8000);

  // DELETE ALL HANDLERS
  setTimeout(() => {
    trackChanges.removeHandler('variable', variableHandler);
    trackChanges.removeHandler('object', objectHandler);
    console.log('All handlers remove');
  }, 15000);

  // DELETE ALL OBSERVERS
  setTimeout(() => {
    trackChanges.removeObserver('variable');
    trackChanges.removeObserver('object');
    console.log('All observers remove');
  }, 15000);
})();
