class TrackChanges {
  state = {
    workerActive: false,
  };

  settings = {
    workerCallInterval: null,
    mainScopeName: 'TrackChanges',
    storage: null,
  };

  constructor(workerCallInterval = 100) {
    if (typeof workerCallInterval === 'number' && workerCallInterval > 0) {
      this.settings.workerCallInterval = workerCallInterval;
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
    const storageLink = globalObject[`${this.settings.mainScopeName}Storage`];

    if (typeof storageLink === 'undefined') {
      // add storage scope
      globalObject[`${this.settings.mainScopeName}Storage`] = {};
      // copy storage scope link
      this.settings.storage =
        globalObject[`${this.settings.mainScopeName}Storage`];
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
    this.settings.storage.tasks = [];
    this.settings.storage.descriptions = {};
  }
}

// export globals
if (typeof module !== 'undefined') {
  module.exports = TrackChanges;
} else {
  window.TrackChanges = TrackChanges;
}
