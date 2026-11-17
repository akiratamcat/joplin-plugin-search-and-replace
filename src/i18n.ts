/*
    Minimal gettext-style translation helper.

    Translations live in /locales/*.po (gettext PO files). Before the webpack
    build, scripts/po2json.js converts them into
    /locales/generated/locales.json, which is bundled here.

    The UI language follows Joplin's own "locale" setting.
*/

import joplin from "api";

type Catalog = { [msgid: string]: string };

// eslint-disable-next-line @typescript-eslint/no-var-requires
const catalogs: { [locale: string]: Catalog } = require("../locales/generated/locales.json");

let currentCatalog: Catalog = {};
let currentLocale: string = "en_GB";

/**
 * Finds the best matching catalog for a Joplin locale (e.g. "ja_JP", "zh_TW", "de_DE").
 * Order: exact match -> language part only -> any catalog of the same language -> none (English).
 */
function findCatalog(locale: string): { locale: string, catalog: Catalog } {
    if (!locale) return null;
    const normalized = locale.replace("-", "_");
    if (catalogs[normalized]) return { locale: normalized, catalog: catalogs[normalized] };

    const lang = normalized.split("_")[0];
    // Hong Kong / Macau use Traditional Chinese:
    if (/^zh_(HK|MO|Hant)/i.test(normalized) && catalogs["zh_TW"]) return { locale: "zh_TW", catalog: catalogs["zh_TW"] };
    if (catalogs[lang]) return { locale: lang, catalog: catalogs[lang] };

    for (const key of Object.keys(catalogs)) {
        if (key.split("_")[0] === lang) return { locale: key, catalog: catalogs[key] };
    }
    return null;
}

/** Sets the active UI language. Falls back to English (msgid) if no catalog matches. */
export function setLocale(locale: string) {
    const found = findCatalog(locale);
    currentLocale = found ? found.locale : "en_GB";
    currentCatalog = found ? found.catalog : {};
}

/** Initializes the UI language from Joplin's global "locale" setting. */
export async function initI18n() {
    let locale = "en_GB";
    try {
        locale = await joplin.settings.globalValue("locale");
    } catch (error) {
        console.warn("Search & Replace i18n: Could not read Joplin's locale, using English.", error);
    }
    setLocale(locale);
}

export function getLocale(): string {
    return currentLocale;
}

/**
 * Translates a message. "%s" placeholders are replaced by the given arguments in order.
 * @example _("\"%s\" couldn't be found.", pattern)
 */
export function _(msgid: string, ...args: any[]): string {
    let text = currentCatalog[msgid];
    if (!text) text = msgid;
    let i = 0;
    return text.replace(/%s/g, () => (i < args.length ? String(args[i++]) : "%s"));
}
