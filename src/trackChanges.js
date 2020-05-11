class TrackChanges {
  state = {
    workerActive: false,
  };

  settings = {
    workerCallInterval: null,
    scope: null,
    scopeName: 'TrackChanges',
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
      this.scopeInit(global);
    } else {
      this.scopeInit(window);
    }
  }

  scopeInit(globalObject) {
    if (typeof globalObject[this.settings.scopeName] === 'undefined') {
      globalObject[this.settings.scopeName] = {
        storage: null,
      };

      const [storage] = globalObject[this.settings.scopeName].storage;

      this.initStorage(storage);
    }
  }

  getEnv() {
    if (typeof module !== 'undefined') {
      return 'nodejs';
    }
    return 'browser';
  }

  initStorage(storage) {}
}

// export globals
if (typeof module !== 'undefined') {
  module.exports = TrackChanges;
} else {
  window.TrackChanges = TrackChanges;
}
