const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf-8');

const old_name = '<div class="stock-name">${stock.name}</div>';
const new_name = '<div class="stock-name">${TW_NAMES[stock.symbol] || stock.name}</div>';
content = content.replace(old_name, new_name);

const old_stats = `<div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 4px;">
            <div class="text-sm text-gray-400">今日漲跌幅</div>
            <div class="\\${stock.changePercent > 0 ? 'text-green-500' : (stock.changePercent < 0 ? 'text-red-500' : 'text-gray-400')}">\\${stock.changePercent > 0 ? '+' : ''}\\${stock.changePercent}%</div>
          </div>
        </div>`.replace(/\\\\/g, '\\');

const new_stats = `<div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 4px;">
            <div class="text-sm text-gray-400">今日漲跌幅</div>
            <div class="\\${stock.changePercent > 0 ? 'text-green-500' : (stock.changePercent < 0 ? 'text-red-500' : 'text-gray-400')}">\\${stock.changePercent > 0 ? '+' : ''}\\${stock.changePercent}%</div>
          </div>
          <div class="mt-2 pt-2 border-t border-gray-700/50" style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.8rem; color: #9ca3af;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span>KD指標:</span> <span style="color: #e5e7eb;">\\${stock.kd || 'N/A'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span>MACD:</span> <span style="color: #e5e7eb;">\\${stock.macd || 'N/A'}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>RSI:</span> <span style="color: #e5e7eb;">\\${stock.rsi || 'N/A'}</span>
            </div>
          </div>
        </div>`.replace(/\\\\/g, '\\');

content = content.replace(old_stats, new_stats);

fs.writeFileSync('app.js', content);
console.log("Patched app.js successfully");
