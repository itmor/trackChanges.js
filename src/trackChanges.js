class TrackChanges {
  state = {
    workerActive: false,
  };

  settings = {
    workerCallInterval: null,
  };

  constructor(workerCallInterval = 100) {
    if (typeof workerCallInterval === 'number' && workerCallInterval > 0) {
      this.settings.workerCallInterval = workerCallInterval;
    } else {
      throw new Error('Interval is incorrect');
    }
  }
}

// export globals
if (typeof module !== 'undefined') {
  module.exports = TrackChanges;
} else {
  window.TrackChanges = TrackChanges;
}
