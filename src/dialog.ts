import { _ } from "./i18n";

export function getDialogHTML() {
    return `
    <div>
        <h3>${_("Search and replace")}</h3>
        <form>
            <table>
                <tr>
                    <td><input class="expand" type="text" name="pattern-txt" value="{pattern}" placeholder="${_("Find")}"></td>
                </tr>
                <tr>
                    <td><input class="expand" type="text" name="replacement-txt" value="{replacement}" placeholder="${_("Replace")}"></td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>${_("Options:")}</td>
                    <td>
                        <input type="checkbox" id="wrap-chk" name="wrap-chk" {wrap}><label for="wrap-chk">${_("Wrap around")}</label><br>
                        <input type="checkbox" id="matchcase-chk" name="matchcase-chk" {matchcase}><label for="matchcase-chk">${_("Match case")}</label><br>
                        <input type="checkbox" id="matchwholeword-chk" name="matchwholeword-chk" {matchwholeword}><label for="matchwholeword-chk">${_("Match whole words only")}</label><br>
                        <input type="checkbox" id="preservecase-chk" name="preservecase-chk" {preservecase}><label for="preservecase-chk">${_("Preserve case")}</label><br>
                        <input type="checkbox" id="multiline-chk" name="multiline-chk" {multiline}><label for="multiline-chk">${_("Use 'multi line' flag")}</label>
                    </td>
                    <td>
                        <input type="radio" id="useliteralsearch-rad" name="matchmethod" value="literal" {matchmethod-literal}><label for="useliteralsearch-rad" checked>${_("Literal search")}</label><br>
                        <input type="radio" id="usewildcards-rad" name="matchmethod" value="wildcards" {matchmethod-wildcards}><label for="usewildcards-rad">${_("Use Wildcards")}</label><br>
                        <input type="radio" id="useregex-rad" name="matchmethod" value="regex" {matchmethod-regex}><label for="useregex-rad">${_("Use Regular Expression")}</label>
                    </td>
                </tr>
            </table>
        </form>
        <!--<p class="small-text">
            If you enable regular expressions, it's going to use JavaScript regex. See MDN docs to learn more.
        </p>-->
    </div>`;
}