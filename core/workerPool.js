const pLimit = require("p-limit");
const os = require("os");

/**
 * Run tasks in parallel with limited concurrency
 * @param {Array} items
 * @param {Function} task
 * @param {number} concurrency
 */
async function runWorkerPool(items, task, concurrency = os.cpus().length) {

  const limit = pLimit(concurrency);

  const tasks = items.map(item =>
    limit(async () => {
      try {
        const result = await task(item);
        return { item, success: true, result };
      } catch (err) {
        return { item, success: false, error: err };
      }
    })
  );

  return Promise.allSettled(tasks);
}


module.exports = { runWorkerPool };