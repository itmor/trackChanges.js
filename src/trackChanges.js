class TrackChanges {
  #state = {
    workerIsActive: false,
    envName: typeof module === 'undefined' ? 'browser' : 'nodejs',
  };

  #vars = {
    handlerCallInterval: null,
    mainScopeName: 'TrackChanges',
    storage: null,
  };

  constructor(handlerCallInterval = 100) {
    this.#vars.handlerCallInterval = handlerCallInterval;
    this.#init();
  }

  #init() {
    this.#scopeInit(this.#state.envName === 'nodejs' ? global : window);
  }

  #scopeInit(globalObject) {
    const scopeTemplate = `${this.#vars.mainScopeName}Storage`;

    if (globalObject[scopeTemplate]) {
      this.#vars.storage = globalObject[scopeTemplate];
    } else {
      this.#initStorage(globalObject, scopeTemplate);
    }
  }

  #initStorage(globalObject, scopeTemplate) {
    this.#vars.storage = globalObject[scopeTemplate] = {};
    this.#vars.storage.tasks = [];
    this.#vars.storage.taskHandler = this.#worker;
  }

  addObserver(name, valueFunc) {
    this.#addTask({
      name,
      value: valueFunc,
      oldValue: valueFunc(),
      remove: false,
      callbacks: [],
    });
  }

  removeObserver(taskName) {
    this.#addMarkerInTask(taskName, 'remove', true);
  }

  addHandler(taskName, callback) {
    this.#getTask(taskName).callbacks.push(callback);
    this.#worker();
  }

  removeHandler(taskName, callback) {
    const currentTask = this.#getTask(taskName);
    const callbackIndex = currentTask.callbacks.findIndex((currentCallback) => callback === currentCallback);
    currentTask.callbacks.splice(callbackIndex, 1);
  }

  #addTask(data) {
    this.#vars.storage.tasks.push(data);
  }

  #getTask(name) {
    return this.#vars.storage.tasks.find((task) => task.name === name);
  }

  #removeTask(name) {
    const index = this.#vars.storage.tasks.findIndex((task) => task.name === name);
    this.#vars.storage.tasks.splice(index, 1);
  }

  #addMarkerInTask(taskName, markerName, markerValue) {
    this.#vars.storage.tasks = this.#vars.storage.tasks.map((task) => ({ ...task, [markerName]: markerValue }));
  }

  #worker() {
    if (this.#state.workerIsActive) {
      return;
    }

    this.#state.workerIsActive = true;

    const handler = setInterval(() => {
      if (!this.#vars.storage.tasks.length) {
        this.#state.workerIsActive = false;
        clearInterval(handler);
      }

      for (const task of this.#vars.storage.tasks) {
        if (task.remove) {
          this.#removeTask(task.name);
        }

        if (!task.remove && task.value() !== task.oldValue && task.callbacks.length) {
          for (const callback of task.callbacks) {
            setTimeout(() => callback(task.value()), 0);
            task.oldValue = task.value();
          }
        }
      }
    }, this.#vars.handlerCallInterval);
  }
}

if (typeof module !== 'undefined') {
  module.exports = TrackChanges;
} else {
  window.TrackChanges = TrackChanges;
}
