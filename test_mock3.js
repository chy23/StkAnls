const fs = require('fs');

const context = {
  document: {
    getElementById: (id) => ({ innerHTML: '', addEventListener: () => {}, style: {} }),
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  window: {},
  fetch: async (url) => {
    return {
      ok: true,
      json: async () => {
        return [
          {
            "change": 58.0,
            "changePercent": 1.89,
            "currentPrice": "3132.0",
            "efficiency": "N/A",
            "eps": "N/A",
            "logic": "...",
            "name": "豐田汽車 (Toyota)",
            "sweetSpot": "2975.4 以下",
            "symbol": "7203.T",
            "type": "動態分析標的",
            "valuationAnchor": "技術面支撐"
          }
        ];
      }
    };
  },
  console: console,
  setTimeout: setTimeout,
  parseFloat: parseFloat,
  isNaN: isNaN,
  Math: Math,
  encodeURIComponent: encodeURIComponent
};

const scriptCode = fs.readFileSync('app.js', 'utf-8');
const vm = require('vm');
vm.createContext(context);
vm.runInContext(scriptCode, context);

async function runTest() {
  try {
    console.log("Calling renderStockCards...");
    await context.renderStockCards();
    console.log("renderStockCards finished with no exceptions!");
  } catch (e) {
    console.error("Caught exception in runTest:", e);
  }
}
runTest();
