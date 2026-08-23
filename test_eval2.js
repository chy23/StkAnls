const fs = require('fs');

global.document = {
  getElementById: (id) => ({ innerHTML: '', addEventListener: () => {}, style: {} }),
  querySelectorAll: () => [],
  addEventListener: (e, cb) => { }
};
const scriptCode = fs.readFileSync('app.js', 'utf-8');
const vm = require('vm');
const context = { document: global.document, window: {}, console, setTimeout };
vm.createContext(context);
try {
  vm.runInContext(scriptCode, context);
  console.log("Script loaded successfully!");
} catch(e) {
  console.error("Script load error:", e);
}
