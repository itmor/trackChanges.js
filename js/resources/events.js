(function () {
  function Events(options) {

    var storage = {
      workerCallInterval: 50
    }

    var root = this;

    var taskStorage = [];

    var descriptionsEventsStorage = {};

    var workerState = {
      activated: false
    }

    var worker = function () {
      if (workerState.activated === false) {
        workerState.activated = true;

        var work = setInterval(function () {

          if (taskStorage.length === 0) {
            workerState.activated = false;
            clearInterval(work);
          }

          for (var i = 0; i < taskStorage.length; i++) {
            var currentTask = taskStorage[i];
            var eventName = currentTask[0];
            var callback = currentTask[1];
            var activated = currentTask[2]['activated'];
            var remove = currentTask[2]['remove'];
            var once = currentTask[2]['once'];
            var oldValue = currentTask[2]['oldValue'];
            var typeEvent = currentTask[2]['type'];

            if (typeEvent === 'triggerEvent') {
              if (descriptionsEventsStorage[eventName].func() === true && activated === false) {
                callback();
                taskStorage[i][2]['activated'] = true;
              }

              if (remove === true) taskStorage.splice(i, 1);

              if (once === true && activated === true) taskStorage.splice(i, 1);

              if (activated === true && descriptionsEventsStorage[eventName].func() !== true) {
                taskStorage[i][2]['activated'] = false;
              }
            } else if (typeEvent === 'morphEvent') {
              if (descriptionsEventsStorage[eventName].value() !== oldValue && activated === false) {
                callback();
                taskStorage[i][2]['activated'] = true;
                taskStorage[i][2]['oldValue'] = descriptionsEventsStorage[eventName].value();
              }

              if (remove === true) taskStorage.splice(i, 1);

              if (once === true && activated === true) taskStorage.splice(i, 1);

              if (activated === true && descriptionsEventsStorage[eventName].value() !== oldValue) {
                taskStorage[i][2]['activated'] = false;
              }
            }
          }
        }, storage.workerCallInterval);
      }
    }

    var addMarkerInTask = function (eventName, callback, marker) {
      for (var i = 0; i < taskStorage.length; i++) {
        if (taskStorage[i][0] === eventName && taskStorage[i][1] === callback) {
          taskStorage[i][2][marker.name] = marker.value;
        }
      }
    }

    var dispatcher = function (eventName, callback, action, onceMode) {
      if (action === 'addTask' && descriptionsEventsStorage[eventName].type === 'morph') {
        taskStorage.push([
          eventName,
          callback,
          {
            activated: false,
            remove: false,
            once: onceMode,
            type: 'morphEvent',
            oldValue: descriptionsEventsStorage[eventName].value()
          }
        ]);

        worker();
      }

      if (action === 'addTask' && descriptionsEventsStorage[eventName].type === 'trigger') {
        taskStorage.push([
          eventName,
          callback,
          {
            activated: false,
            remove: false,
            once: onceMode,
            type: 'triggerEvent'
          }
        ]);

        worker();
      }

      if (action === 'removeTask' && descriptionsEventsStorage.hasOwnProperty(eventName) === true) {
        addMarkerInTask(eventName, callback, {
          name: 'remove',
          value: true
        });
      }
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

    this.add = function (descriptionEvent, morph) {
      if (typeof descriptionEvent === 'object' && morph === undefined) {
        Object.keys(descriptionEvent).forEach(function (key) {
          if (typeof descriptionEvent[key] === 'function') {
            descriptionsEventsStorage[key] = {
              func: descriptionEvent[key],
              type: 'trigger'
            }
          } else {
            throw new Error('The description of the event with the name' + key + ' was created incorrectly, the key value is not a function.');
          }
        });
      } else if (typeof descriptionEvent === 'object' && morph === 'morph') {
        Object.keys(descriptionEvent).forEach(function (key) {
          if (typeof descriptionEvent[key] === 'function') {
            descriptionsEventsStorage[key] = {
              value: descriptionEvent[key],
              type: 'morph'
            }
          } else {
            throw new Error('The description of the event with the name' + key + ' was created incorrectly, the key value is not a function.');
          }
        });
      }  else {
        throw new Error('Incorrect event description.');
      }
    }

    this.remove = function (nameDescriptionEvent) {
      if (descriptionsEventsStorage.hasOwnProperty(nameDescriptionEvent) === true && typeof nameDescriptionEvent === 'string') {
        delete descriptionsEventsStorage[nameDescriptionEvent];
      }
    }

    var construct = function (options) {
      if (typeof options === 'object') {
        extend(options, storage);
      }
    }

    var extend = function (heir, parent) {
      Object.keys(heir).forEach(function (key) {
        parent[key] = heir[key];
      });
    }

    construct(options);
  }

  window.Events = Events;
})();