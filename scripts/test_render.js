const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf-8');
const vm = require('vm');

let renderedHtml = '';
let emptyStateShown = false;

const sandbox = {
  document: {
    addEventListener: () => {},
    getElementById: (id) => {
      if (id === 'schematics-grid') {
        return {
          set innerHTML(val) { renderedHtml = val; },
          get innerHTML() { return renderedHtml; }
        };
      }
      if (id === 'empty-state') {
        return {
          style: {},
          classList: {
            remove: () => { emptyStateShown = false; },
            add: () => { emptyStateShown = true; }
          }
        };
      }
      return { addEventListener: () => {}, querySelector: () => null, style: {} };
    },
    querySelectorAll: () => [],
    querySelector: () => null,
  },
  window: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  navigator: { clipboard: { writeText: () => Promise.resolve() } },
  console: console,
  lucide: { createIcons: () => {} }
};

vm.createContext(sandbox);
vm.runInContext(content + '; schematics = [...DEFAULT_SCHEMATICS]; renderSchematics();', sandbox);

const cardCount = (renderedHtml.match(/class="schem-card"/g) || []).length;
console.log('Cards rendered by renderSchematics():', cardCount);
console.log('Empty state shown:', emptyStateShown);
