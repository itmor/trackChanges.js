class TrackChanges {
  state = {
    workerActive: false,
  };

  settings = {
    workerCallInterval: null,
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
      this.nodeScopeInit();
    } else {
      this.browserScopeInit();
    }
  }

  browserScopeInit() {}

  nodeScopeInit() {}

  getEnv() {
    if (typeof module !== 'undefined') {
      return 'nodejs';
    }
    return 'browser';
  }

  initStorage() {}
}

// export globals
if (typeof module !== 'undefined') {
  module.exports = TrackChanges;
} else {
  window.TrackChanges = TrackChanges;
}
