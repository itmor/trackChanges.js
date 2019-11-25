(function () {
  function Events(options) {

    if (options !== undefined && options.workerCallInterval !== undefined && typeof options.workerCallInterval === 'number') {
      this.workerCallInterval = options.workerCallInterval;
    } else {
      this.workerCallInterval = 11;
    }

    var root = this;

    this.taskStorage = [];

    this.descriptionsEventsStorage = {}

    this.workerState = {
      activated: false
    }

    this.worker = function () {
      if (root.workerState.activated === false) {
        root.workerState.activated = true;

        var work = setInterval(function () {
          if (root.taskStorage.length === 0) {
           root.workerState.activated = false;
            clearInterval(work);
          }
          console.log('Work');
          for (var i = 0; i < root.taskStorage.length; i++) {
            var currentTask = root.taskStorage[i];
            var eventName = currentTask[0];
            var callback = currentTask[1];
            var activated = currentTask[2]['activated'];
            var remove = currentTask[2]['remove'];
            var once = currentTask[2]['once'];

            if (typeof root.descriptionsEventsStorage[eventName] !== 'function') {
              root.taskStorage.splice(i, 1);
            }

            if (typeof root.descriptionsEventsStorage[eventName] === 'function' && root.descriptionsEventsStorage[eventName]() === true && activated === false) {
              callback();
              root.taskStorage[i][2]['activated'] = true;
            }

            if (remove === true) {
              root.taskStorage.splice(i, 1);
            }

            if (once === true && activated === true) {
              root.taskStorage.splice(i, 1);
            }

            if (activated === true && root.descriptionsEventsStorage[eventName]() === false) {
              root.taskStorage[i][2]['activated'] = false;
            }
          }
        }, root.workerCallInterval);
      }
    }

    this.addMarkerInTask = function (eventName, callback, marker) {
      for (var i = 0; i < root.taskStorage.length; i++) {
        if (root.taskStorage[i][0] === eventName && root.taskStorage[i][1] === callback) {
          root.taskStorage[i][2][marker.name] = marker.value;
        }
      }
    }

    this.dispatcher = function (eventName, callback, action, onceMode) {
      if (root.descriptionsEventsStorage[eventName] === undefined) {
        throw new Error('No "' + eventName + '" event found first describe it through the .add(...) method ');
      }

      if (action === 'addTask' && root.descriptionsEventsStorage[eventName] !== undefined) {
        root.taskStorage.push([
          eventName,
          callback,
          {
            activated: false,
            remove: false,
            once: onceMode
          }
        ]);

        root.worker();
      }

      if (action === 'removeTask' && root.descriptionsEventsStorage[eventName] !== undefined) {
        root.addMarkerInTask(eventName, callback, {
          name: 'remove',
          value: true
        });
      }
    }

    this.on = function (eventName, callback, onceMode) {
      if ((typeof eventName === 'string' && typeof callback === 'function') && (typeof onceMode === 'boolean' || onceMode === undefined)) {
        root.dispatcher(eventName, callback, 'addTask', onceMode);
      } else if (typeof eventName !== 'string' || typeof callback !== 'function' || typeof onceMode !== 'boolean' || onceMode !== undefined) {
        throw new Error('Error adding listener. Scheme .on(string: eventName, function: callback, boolean: onceMode | undefined: onceMode )');
      }
    }

    this.off = function (eventName, callback) {
      if (typeof eventName === 'string' && typeof callback === 'function') {
        root.dispatcher(eventName, callback, 'removeTask');
      } else if (typeof eventName !== 'string' || typeof callback !== 'function') {
        throw new Error('Error remove listener. Scheme .off(string: eventName, function: callback)');
      }
    }

    this.add = function (descriptionEvent) {
      if (typeof descriptionEvent === 'object') {
        Object.keys(descriptionEvent).forEach(function (key) {
          if (typeof descriptionEvent[key] === 'function') {
           root.descriptionsEventsStorage[key] = descriptionEvent[key];
          } else {
            throw new Error('The description of the event with the name' + key + ' was created incorrectly, the key value is not a function.');
          }
        });
      } else {
        throw new Error('Incorrect event description, description is not an object.');
      }
    }

    this.remove = function (nameDescriptionEvent) {
      if (root.descriptionsEventsStorage[nameDescriptionEvent] !== undefined && typeof nameDescriptionEvent === 'string') {
        delete root.descriptionsEventsStorage[nameDescriptionEvent];
      }
    }
  }

  window.Events = Events;
})();