// TODO:
// - The todo text objects created by function factories
// - Todo objects need to have attributes such as title, description, dates, priorities, checklist, etc.
// - Function factory for project folders which are parents to individual todo objects
// - Create new projects / delete projects
// - Sepearate app logic vs DOM logic
// - Clean UI (View all projects, view idividual todos, color code priorities, expand individual todo, delete todo)
// - localStorage

import { toDoEls } from "./elements";
import { toDoLists } from "./scripts";

window.onload = () => {
    toDoEls.initPage();
}
