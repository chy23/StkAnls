const fs = require('fs');

global.document = {
  getElementById: (id) => {
    return {
      innerHTML: '',
      addEventListener: () => {},
      style: {}
    };
  },
  querySelectorAll: () => [],
  addEventListener: (event, cb) => {
    if(event === 'DOMContentLoaded') global.onReady = cb;
  }
};
global.window = {
  TW_NAMES: {}
};

// Mock fetch
global.fetch = async () => ({
  ok: true,
  json: async () => ([{ symbol: '2330.TW', currentPrice: 500, change: 10, changePercent: 2 }])
});

// Load the app script
const scriptCode = fs.readFileSync('app.js', 'utf-8');
eval(scriptCode);

async function test() {
  console.log("Calling renderStockCards...");
  await renderStockCards();
  console.log("renderStockCards finished");
}

test().catch(console.error);
