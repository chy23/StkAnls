const fs = require('fs');

global.document = {
  getElementById: (id) => ({ innerHTML: '', addEventListener: () => {}, style: {} }),
  querySelectorAll: () => [],
  addEventListener: (e, cb) => { if(e==='DOMContentLoaded') setTimeout(cb, 100); }
};

global.fetch = async () => ({
  ok: true,
  json: async () => ([{ symbol: '2330', currentPrice: 500, change: 10, changePercent: 2 }])
});

// require it like a module
const scriptCode = fs.readFileSync('app.js', 'utf-8');
const vm = require('vm');
const context = { document: global.document, fetch: global.fetch, window: {}, console, setTimeout, extractNumber: (str) => parseFloat(str) };
vm.createContext(context);
vm.runInContext(scriptCode, context);

setTimeout(() => {
  context.renderStockCards().then(() => console.log("Success")).catch(e => console.error("Error:", e));
}, 200);
