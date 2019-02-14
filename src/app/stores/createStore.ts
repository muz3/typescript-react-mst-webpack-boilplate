import { History } from 'history';
import { RouterStore } from './RouterStore';
import TodoStore from './TodoStore'
import { STORE_TODO, STORE_ROUTER } from 'app/constants';

// default user data for demo
const todoStore = TodoStore.create({
  todos: [   
    {
      id: 1,
      text: 'test',
      completed: true
    }
  ]
});

export function createStores(history: History) {
  const routerStore = new RouterStore(history);
  return {
    [STORE_TODO]: todoStore,
    [STORE_ROUTER]: routerStore
  };
}
