// TODO:
// - localStorage

import { staticEls } from "./elements";
import { scripts } from "./script";

window.onload = () => {
    staticEls.initPage();
    scripts.updatePArray();
    scripts.renderContent();
}
