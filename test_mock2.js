const fs = require('fs');
const scriptCode = fs.readFileSync('app.js', 'utf-8');
const context = { window: {}, document: { getElementById: () => ({ addEventListener: () => {} }), addEventListener: () => {} }, console: console };
const vm = require('vm');
vm.createContext(context);
vm.runInContext(scriptCode, context);
console.log("window.TW_NAMES is:", typeof context.window.TW_NAMES);
