$(function () {
  var Events = function () {

    var root = this;

    var taskStorage = [];

    var descriptionsEventsStorage = {

    }

    var workerState = {

    }

    var worker = function (params) {

    }

    var checkTaskInStorage = function (params) {

    }

    var dispatcher = function (eventName, callback, action, onceMode) {

    }

    this.on = function (eventName, callback, onceMode) {
      if ((typeof eventName === 'string' && typeof callback === 'function') && (typeof onceMode === 'boolean' || onceMode === undefined)) {
        dispatcher(eventName, callback, 'addTask', onceMode);
      } else if (typeof eventName !== 'string' || typeof callback !== 'function' || typeof onceMode !== 'boolean' || onceMode !== undefined) {
        throw new Error('Error adding listener. Scheme .on(string: eventName, function: callback, boolean: onceMode | undefined: onceMode )');
      }
    }

    this.off = function (eventName, callback) {
      if (typeof eventName === 'string' && typeof callback === 'function') {
        dispatcher(eventName, callback, 'removeTask');
      } else if (typeof eventName !== 'string' || typeof callback !== 'function') {
        throw new Error('Error remove listener. Scheme .off(string: eventName, function: callback)');
      }
    }

    this.add = function (descriptionEvent) {
      if (typeof descriptionEvent === 'object') {
        Object.keys(descriptionEvent).forEach(function (key) {
          if (typeof descriptionEvent[key] === 'function') {
            descriptionsEventsStorage[key] = descriptionEvent[key];
          } else {
            throw new Error('The description of the event with the name' + key + ' was created incorrectly, the key value is not a function.');
          }
        });
      } else {
        throw new Error('Incorrect event description, description is not an object.');
      }
    }

    this.remove = function (nameDescriptionEvent) {
      if (descriptionsEventsStorage[nameDescriptionEvent] !== undefined && typeof nameDescriptionEvent === 'string') {
        delete descriptionsEventsStorage[nameDescriptionEvent];
      }
    }
  }

  window.Events = Events;
});