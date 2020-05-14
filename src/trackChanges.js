class TrackChanges {
  state = {
    taskHandlerActive: false,
  };

  vars = {
    taskHandlerCallInterval: null,
    mainScopeName: 'TrackChanges',
    storage: null,
  };

  constructor(taskHandlerCallInterval = 100) {
    if (
      typeof taskHandlerCallInterval === 'number' &&
      taskHandlerCallInterval > 0
    ) {
      this.vars.taskHandlerCallInterval = taskHandlerCallInterval;
      this.init();
    } else {
      throw new Error('Interval is incorrect');
    }
  }

  init() {
    if (this.getEnv() === 'nodejs') {
      this.namespaceStorageInit(global);
    } else {
      this.namespaceStorageInit(window);
    }
  }

  namespaceStorageInit(globalObject) {
    const storageLink = globalObject[`${this.vars.mainScopeName}Storage`];

    if (typeof storageLink === 'undefined') {
      globalObject[`${this.vars.mainScopeName}Storage`] = {};

      this.vars.storage = globalObject[`${this.vars.mainScopeName}Storage`];

      this.initStorage();
    } else {
      this.vars.storage = globalObject[`${this.vars.mainScopeName}Storage`];
    }
  }

  getEnv() {
    if (typeof module !== 'undefined') {
      return 'nodejs';
    }
    return 'browser';
  }

  initStorage() {
    this.vars.storage.tasks = [];
    this.vars.storage.taskHandler = this.taskHandler;
  }

  watch(nameTask, valueFunc) {
    // add task
    this.addTask({
      taskName: nameTask,
      value: valueFunc,
      oldValue: valueFunc(),
      remove: false,
      callBacks: [],
    });
  }

  addListener(nameTask, callBack) {
    // add callback to task callback list
    const foundTask = this.getTask(nameTask);

    foundTask.callBacks.push(callBack);
    // run taskHandler
    this.taskHandler();
  }

  addTask(data) {
    this.vars.storage.tasks.push(data);
  }

  getTask(nameTask) {
    // return task in task storage
    for (const task of this.vars.storage.tasks) {
      if (nameTask === task.taskName) {
        return task;
      }
    }
  }

  addMarkerInTask(nameTask, markerName, markerValue) {
    for (const task of this.vars.storage.tasks) {
      if (nameTask === task.taskName) {
        task[markerName] = markerValue;
      }
    }
  }

  removeTask(nameTask) {
    // delete array element
    for (let i; i < this.vars.storage.tasks.length; i += 1) {
      if (this.vars.storage.tasks[i].taskName === nameTask) {
        this.vars.storage.tasks.splice(i, 1);
      }
    }
  }

  taskHandler() {
    // run and delete task
    // prevent multiple calling
    if (this.state.taskHandlerActive === false) {
      this.state.taskHandlerActive = true;

      const handler = setInterval(() => {
        // disable the handler if there are no tasks
        if (this.vars.storage.tasks.length === 0) {
          this.vars.state.taskHandlerActive = false;
          clearInterval(handler);
        }
        // run handle
        for (const task of this.vars.storage.tasks) {
          // destroy the task if it is marked
          if (task.remove === true) {
            this.removeTask(task.taskName);
          }
          // check changed value
          if (
            task.remove === false &&
            task.value() !== task.oldValue &&
            task.callBacks.length > 0
          ) {
            // run callbacks in task
            for (const callBack of task.callBacks) {
              callBack(task.value());
              task.oldValue = task.value();
            }
          }
        }
      }, this.vars.taskHandlerCallInterval);
    }
  }
}

// export globals
if (typeof module !== 'undefined') {
  module.exports = TrackChanges;
} else {
  window.TrackChanges = TrackChanges;
}
