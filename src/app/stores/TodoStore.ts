import { types, Instance, cast } from 'mobx-state-tree';
import { Todo } from '../models'

// * Due to the way typeof operator works, when working with big and deep models trees, 
// * it might make your IDE/ts server takes a lot of CPU time and freeze vscode (or others)
// type TodoType = Instance<typeof Todo>
interface TodoType extends Instance<typeof Todo> {}

const TodoStore = types
  .model({
    todos: types.optional(types.array(Todo), [] )
  })
  .views( self => ({
    get activeTodos () {
      return self.todos.filter(todo => !todo.completed);
    },
    get completedTodos () {
      return self.todos.filter( todo => todo.completed);
    }
  }))
  .actions( self => ({
    addTodo(text: string): void {
      self.todos.push(Todo.create({ id: self.todos.length + 1, text }))
    },
    editTodo(id: number, data: Partial<TodoType>): void{
      console.log('self.todos', self.todos)
      self.todos = cast(self.todos.map((todo: TodoType) => {
        if (todo.id === id) {
          if (typeof data.completed == 'boolean') {
            todo.completed = data.completed;
          }
          if (typeof data.text == 'string') {
            todo.text = data.text;
          }
        }
        return todo;
      }));
    },
    deleteTodo(id: number): void {
      self.todos = cast(self.todos.filter((todo: TodoType) => todo.id !== id));
    },
    completeAll(): void {
      self.todos = cast(self.todos.map((todo: TodoType) => ({ ...todo, completed: true })));
    },
    clearCompleted(): void {
      self.todos = cast(self.todos.filter((todo:TodoType) => !todo.completed));
    }

  }))

export default TodoStore;
