const fs = require('fs');
const scriptCode = fs.readFileSync('app.js', 'utf-8');
const context = { window: {}, document: { getElementById: () => ({ addEventListener: () => {} }), addEventListener: () => {} }, console: console };
const vm = require('vm');
vm.createContext(context);
vm.runInContext(scriptCode, context);
console.log("Keys of window:", Object.keys(context.window));
console.log("Keys of global context:", Object.keys(context).filter(k => !['window', 'document', 'console'].includes(k)));
