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

  // init methods
  init() {
    if (this.getEnv() === 'nodejs') {
      this.scopeStorageInit(global);
    } else {
      this.scopeStorageInit(window);
    }
  }

  scopeStorageInit(globalObject) {
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
    this.vars.storage.descriptions = {};
  }
}

// export globals
if (typeof module !== 'undefined') {
  module.exports = TrackChanges;
} else {
  window.TrackChanges = TrackChanges;
}
