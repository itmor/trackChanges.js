window.addEventListener('load', function () {
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

  // Track dom element changed
  let textDom = document.querySelector('.text');
  trackChanges.addObserver('textColor', () => textDom.style.color);
  trackChanges.addHandler('textColor', textColorHandler);

  function textColorHandler(modifiedResult) {
    console.log(`Text color changed to: ${modifiedResult}`);
  }

  setTimeout(() => {
    textDom.style.color = '#ca1111';
  }, 5000);

  // GET OBSERVER STRUCT BY NAME
  setTimeout(() => {
    trackChanges.getObserverStruct('variable');
  }, 6000);

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
    trackChanges.removeHandler('textColor', textColorHandler);
    console.log('All handlers remove');
  }, 20000);

  // DELETE ALL OBSERVERS
  setTimeout(() => {
    trackChanges.removeObserver('variable');
    trackChanges.removeObserver('object');
    trackChanges.removeObserver('textColor');
    console.log('All observers remove');
  }, 20000);
});
