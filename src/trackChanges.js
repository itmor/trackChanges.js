class TrackChanges {
  state = {
    workerActive: false,
  };

  vars = {
    workerCallInterval: null,
    mainScopeName: 'TrackChanges',
    storage: null,
  };

  constructor(workerCallInterval = 100) {
    if (typeof workerCallInterval === 'number' && workerCallInterval > 0) {
      this.vars.workerCallInterval = workerCallInterval;
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
    this.vars.storage.worker = this.worker;
  }

  watch(name, valueFunc) {
    // add task
    this.addTask({
      taskName: name,
      value: valueFunc,
      oldValue: valueFunc(),
    });
    // run worker
    this.worker();
  }

  addTask(data) {
    this.vars.storage.tasks.push(data);
  }

  getTask(name) {
    // return task in task storage
  }

  removeTask() {
    // add remove marker in task
  }

  worker() {
    // empty
  }
}

// export globals
if (typeof module !== 'undefined') {
  module.exports = TrackChanges;
} else {
  window.TrackChanges = TrackChanges;
}
