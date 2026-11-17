import joplin from "api";
import { SettingItemType } from "api/types";
import { _ } from "./i18n";

/**
 * Returns all settings the user can/has set.
*/
export async function getSettings() {
	return {
		"SARGUIPreference": await joplin.settings.value('SARGUIPreference')
	}
}

/**
 * Register this plugin"s settings to Joplin.
 */
export async function registerAllSettings() {
    const section = "SAROptions";

    await joplin.settings.registerSection(section, {
        label: _("Search & Replace i18n"),
        description: _("Search & Replace i18n"),
        iconName: "fas fa-search"
    });

    await joplin.settings.registerSettings({
        ["SARGUIPreference"]: { 
			public: true,
			section: section,
			type: SettingItemType.String,
			isEnum: true,
			value: "panel",
			label: _("GUI Preference"),
			description: _("If you don't like the panel, you can switch to a popup dialog instead."),
			options: {
				"panel": _("Open a panel (default, recommended)"),
				"dialog": _("Open a dialog (like in previous versions)")
			},
		}
    });
}