$(function () {
  var Events = function () {

    var root = this;

    var taskStorage = [];

    var descriptionsEventsStorage = {};

    var workerState = {

    }

    var worker = function (params) {
      
    }

    var checkTaskInStorage = function (params) {
      
    }

    var dispatcher = function (params) {
      
    }

    this.on = function (params) {
      
    }

    this.off = function (params) {
      
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