import {TasksStateType} from "../components/App";
import {v1} from "uuid";
import {AddTodoListActionType} from "./todoList-reducer";
import {TaskType} from "../components/Todolist";

export type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    taskId: string
    todoListId: string

}
export type AddTaskActionType = {
    type: "ADD_TASK"
    title: string
    id: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS"
    id: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    id: string
    newTitle: string
    todolistId: string
}
export type RemoveTodoListActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter((task: TaskType) => task.id !== action.taskId)
            }
        case "ADD_TASK":
            return {
                ...state,
                [action.id]: [{id: v1(), title: action.title, isDone: false}, ...state[action.id]]
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((el: TaskType) => el.id === action.id ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((el: TaskType) => el.id === action.id ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        case "ADD_TODOLIST":
            return {
                ...state,
                [action.id]: []
            }
        case "REMOVE_TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE_TASK",
        taskId,
        todoListId
    }
}

export const addTaskAC = (title: string, id: string): AddTaskActionType => {
    return {
        type: "ADD_TASK",
        title,
        id,
    }
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE_TASK_STATUS",
        id,
        isDone,
        todolistId,
    }
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE_TASK_TITLE",
        id,
        newTitle,
        todolistId,
    }
}
export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE_TODOLIST",
        id,
    }
}