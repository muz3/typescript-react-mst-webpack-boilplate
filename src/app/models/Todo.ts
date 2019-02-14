import { types } from "mobx-state-tree";

const Todo = types
  .model({
    id: types.identifierNumber,
    text: types.optional(types.string, ""),
    completed: types.optional(types.boolean, false)
  })
  .actions(self => ({
    setText(text: string) {
        self.text = text;
    },

    toggle() {
        self.completed = !self.completed;
    }
}))

export default Todo