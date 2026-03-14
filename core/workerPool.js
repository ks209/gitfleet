const pLimit = require("p-limit");

const os = require("os");
const workers = os.cpus().length * 2;

/**
 * Run tasks in parallel with limited concurrency
 * @param {Array} items - list of items (repos)
 * @param {Function} task - async function to run per item
 * @param {number} workers - number of parallel workers
 */
async function runWorkerPool(items, task, workers=4) {
  const limit = pLimit(workers);

  const tasks = items.map(item =>
    limit(() => task(item))
  );

  return Promise.allSettled(tasks);
}

module.exports = { runWorkerPool };