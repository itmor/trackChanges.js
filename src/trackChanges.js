class TrackChanges {
  #state = {
    taskHandlerActive: false,
  };

  #vars = {
    taskHandlerCallInterval: null,
    mainScopeName: 'TrackChanges',
    storage: null,
  };

  constructor(taskHandlerCallInterval = 100) {
    if (typeof taskHandlerCallInterval === 'number' && taskHandlerCallInterval > 0) {
      this.#vars.taskHandlerCallInterval = taskHandlerCallInterval;
      this.#init();
    } else {
      throw new Error('Interval is incorrect');
    }
  }

  #init() {
    if (this.#getEnv() === 'nodejs') {
      this.#namespaceStorageInit(global);
    } else {
      this.#namespaceStorageInit(window);
    }
  }

  #namespaceStorageInit(globalObject) {
    const storageLink = globalObject[`${this.#vars.mainScopeName}Storage`];

    if (typeof storageLink === 'undefined') {
      globalObject[`${this.#vars.mainScopeName}Storage`] = {};

      this.#vars.storage = globalObject[`${this.#vars.mainScopeName}Storage`];

      this.#initStorage();
    } else {
      this.#vars.storage = globalObject[`${this.#vars.mainScopeName}Storage`];
    }
  }

  #getEnv() {
    if (typeof module !== 'undefined') {
      return 'nodejs';
    }
    return 'browser';
  }

  #initStorage() {
    this.#vars.storage.tasks = [];
    this.#vars.storage.taskHandler = this.#taskHandler;
  }

  addObserver(nameTask, valueFunc) {
    if (typeof nameTask !== 'string' || typeof valueFunc !== 'function') {
      throw new Error('Wrong type of input parameters');
    } else if (this.#getTask(nameTask) !== undefined) {
      throw new Error('This name is already being used');
    }

    this.#addTask({
      taskName: nameTask,
      value: valueFunc,
      oldValue: valueFunc(),
      remove: false,
      callBacks: [],
    });
  }

  removeObserver(nameTask) {
    if (typeof nameTask !== 'string') {
      throw new Error('Invalid data type argument');
    } else if (this.#getTask(nameTask) === undefined) {
      throw new Error('Unable to delete un created observer');
    }

    this.#addMarkerInTask(nameTask, 'remove', true);
  }

  addHandler(nameTask, callBack) {
    if (typeof nameTask !== 'string' || typeof callBack !== 'function') {
      throw new Error('Invalid data type argument');
    } else if (this.#getTask(nameTask) === undefined) {
      throw new Error('Unable to Subscribe to an Un-Created Observer');
    }

    const foundTask = this.#getTask(nameTask);
    foundTask.callBacks.push(callBack);
    this.#taskHandler();
  }

  removeHandler(nameTask, callBack) {
    if (typeof nameTask !== 'string' || typeof callBack !== 'function') {
      throw new Error('Invalid data type argument');
    } else if (this.#getTask(nameTask) === undefined) {
      throw new Error('It is not possible to remove a nonexistent handler');
    }
    // get task in storage
    for (let taskCount = 0; taskCount < this.#vars.storage.tasks.length; taskCount += 1) {
      if (this.#vars.storage.tasks[taskCount].taskName === nameTask) {
        const currentTask = this.#vars.storage.tasks[taskCount];
        // get callbacks in task
        for (let callBackCount = 0; callBackCount < currentTask.callBacks.length; callBackCount += 1) {
          const currentCallBack = currentTask.callBacks[callBackCount];
          // delete callback in task callbacks
          if (currentCallBack === callBack) {
            currentTask.callBacks.splice(callBackCount, 1);
          }
        }
      }
    }
  }

  #addTask(data) {
    this.#vars.storage.tasks.push(data);
  }

  #getTask(nameTask) {
    for (const task of this.#vars.storage.tasks) {
      if (nameTask === task.taskName) {
        return task;
      }
    }
    return undefined;
  }

  #addMarkerInTask(nameTask, markerName, markerValue) {
    for (const task of this.#vars.storage.tasks) {
      if (nameTask === task.taskName) {
        task[markerName] = markerValue;
      }
    }
  }

  #removeTask(nameTask) {
    for (let i = 0; i < this.#vars.storage.tasks.length; i += 1) {
      if (this.#vars.storage.tasks[i].taskName === nameTask) {
        this.#vars.storage.tasks.splice(i, 1);
      }
    }
  }

  #taskHandler() {
    // prevent multiple calling
    if (this.#state.taskHandlerActive === false) {
      this.#state.taskHandlerActive = true;

      const handler = setInterval(() => {
        // disable the handler if there are no tasks
        if (this.#vars.storage.tasks.length === 0) {
          this.#state.taskHandlerActive = false;
          clearInterval(handler);
        }
        // run handle
        for (const task of this.#vars.storage.tasks) {
          // destroy the task if it is marked
          if (task.remove === true) {
            this.#removeTask(task.taskName);
          }
          // check changed value
          if (task.remove === false && task.value() !== task.oldValue && task.callBacks.length > 0) {
            // run callbacks in task
            for (const callBack of task.callBacks) {
              setTimeout(() => {
                callBack(task.value());
              }, 0);
              task.oldValue = task.value();
            }
          }
        }
      }, this.#vars.taskHandlerCallInterval);
    }
  }
}

// export globals
if (typeof module !== 'undefined') {
  module.exports = TrackChanges;
} else {
  window.TrackChanges = TrackChanges;
}
