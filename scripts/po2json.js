// Converts locales/*.po (gettext) into locales/generated/locales.json,
// which is bundled into the plugin by src/i18n.ts.
//
// Usage: node scripts/po2json.js

const fs = require('fs');
const path = require('path');
const gettextParser = require('gettext-parser');

const localesDir = path.resolve(__dirname, '..', 'locales');
const outDir = path.resolve(localesDir, 'generated');
const outFile = path.resolve(outDir, 'locales.json');

const result = {};

for (const file of fs.readdirSync(localesDir).sort()) {
	if (!file.endsWith('.po')) continue;
	const locale = path.basename(file, '.po');
	const po = gettextParser.po.parse(fs.readFileSync(path.resolve(localesDir, file)), 'utf8');
	const catalog = {};
	let total = 0;
	let translated = 0;

	for (const context of Object.keys(po.translations)) {
		for (const msgid of Object.keys(po.translations[context])) {
			if (!msgid) continue; // header
			const entry = po.translations[context][msgid];
			total++;
			const isFuzzy = entry.comments && entry.comments.flag && entry.comments.flag.includes('fuzzy');
			const msgstr = entry.msgstr && entry.msgstr[0];
			if (msgstr && !isFuzzy) {
				catalog[msgid] = msgstr;
				translated++;
			}
		}
	}

	result[locale] = catalog;
	console.info(`po2json: ${locale}: ${translated}/${total} translated`);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(result, null, '\t') + '\n', 'utf8');
console.info(`po2json: wrote ${path.relative(process.cwd(), outFile)}`);
