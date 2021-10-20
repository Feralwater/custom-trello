import {tasksReducer} from './tasks-reducer';
import {todoListReducer} from './todoList-reducer';
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

