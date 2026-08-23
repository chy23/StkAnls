const fs = require('fs');
let content = fs.readFileSync('style.css', 'utf-8');

content = content.replace(
  'table th:first-child,\ntable td:first-child {\n  position: sticky;\n  left: 0;\n  background: var(--card-bg);\n  backdrop-filter: blur(12px);\n  z-index: 10;',
  'table th:first-child,\ntable td:first-child {\n  position: sticky;\n  left: 0;\n  background: var(--card-bg);\n  backdrop-filter: blur(12px);\n  z-index: 10;\n}\ntable th:first-child {\n  z-index: 30;\n'
);

content = content.replace(
  'th, td {\n  padding: 1rem;\n  border-bottom: 1px solid rgba(255,255,255,0.05);\n}',
  'th, td {\n  padding: 1rem;\n  border-bottom: 1px solid rgba(255,255,255,0.05);\n}\nth {\n  position: sticky;\n  top: 0;\n  background: var(--card-bg);\n  z-index: 20;\n  backdrop-filter: blur(12px);\n  box-shadow: 0 1px 0 rgba(255,255,255,0.1);\n}'
);

fs.writeFileSync('style.css', content);
console.log("Patched style.css successfully");
