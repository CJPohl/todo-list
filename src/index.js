// TODO:
// - Edit logic for both projects and todo
// - Sepearate app logic vs DOM logic
// - Clean UI (View all projects, view idividual todos, color code priorities, expand individual todo, delete todo)
// - localStorage

import { toDoEls } from "./elements";
import { objects, scripts } from "./script";




window.onload = () => {
    toDoEls.initPage();
    scripts.renderProjects();
    scripts.renderToDos();
}
