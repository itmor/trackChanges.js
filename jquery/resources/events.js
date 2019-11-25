$(function () {
  var Events = function (options) {

    var vars = {
      workerCallInterval: 200
    }
    
    this.construct = function (options) {
      $.extend(vars, options);
    };

    var taskStorage = [];

    var descriptionsEventsStorage = {}

    var workerState = {
      activated: false
    }

    var worker = function (params) {
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
            
            if (typeof descriptionsEventsStorage[eventName] !== 'function') {
              taskStorage.splice(i, 1);
            }
            
            if (typeof descriptionsEventsStorage[eventName] === 'function' && descriptionsEventsStorage[eventName]() === true && activated === false) {
              callback();
              taskStorage[i][2]['activated'] = true;
            }

            if (remove === true) {
              taskStorage.splice(i, 1);
            }

            if (once === true && activated === true) {
              taskStorage.splice(i, 1);
            }

            if (activated === true && descriptionsEventsStorage[eventName]() === false) {
              taskStorage[i][2]['activated'] = false;
            }
          }
        }, vars.workerCallInterval);
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
      if (descriptionsEventsStorage[eventName] === undefined) {
        throw new Error('No "' + eventName + '" event found first describe it through the .add(...) method ');
      }

      if (action === 'addTask' && descriptionsEventsStorage[eventName] !== undefined) {
        taskStorage.push([
          eventName,
          callback,
          {
            activated: false,
            remove: false,
            once: onceMode
          }
        ]);

        worker();
      }

      if (action === 'removeTask' && descriptionsEventsStorage[eventName] !== undefined) {
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

    this.construct(options);
  }

  window.Events = Events;
});