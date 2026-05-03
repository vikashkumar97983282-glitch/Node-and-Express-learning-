const autocannon = require('autocannon');

const DURATION = 30;
const URLS = ['http://localhost:3000', 'http://localhost:3000/about'];

function runTest(url, duration) {
  return new Promise((resolve) => {
    const instance = autocannon({ url, duration });

    instance.on('done', (result) => {
      resolve({ url, duration, totalRequests: result.requests.total });
    });
  });
}

async function main() {
  for (const url of URLS) {
    const result = await runTest(url, DURATION);
    console.log(`${result.url} ${result.totalRequests} ${result.duration}`);
  }
}

main();
