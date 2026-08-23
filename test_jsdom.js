const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const scriptCode = fs.readFileSync('app.js', 'utf-8');

const dom = new JSDOM(html, { runScripts: "outside-only" });
const window = dom.window;
const document = window.document;

// Mock fetch
window.fetch = async (url) => {
  return {
    ok: true,
    json: async () => ([
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
    ])
  };
};

// Evaluate the script in the context of the JSDOM window
dom.window.eval(scriptCode);

async function run() {
  try {
    console.log("Calling renderStockCards...");
    await dom.window.renderStockCards();
    console.log("Success! No exceptions.");
  } catch (e) {
    console.error("Exception thrown:", e);
  }
}
run();
