import {FilterValuesType, TodolistType} from "../App";


export type RemoveTodoListActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD_TODOLIST"
    title: string
    id: string
}
export type ChangeTodoListTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE"
    id: string
    newTitle: string
}
export type ChangeTodoListFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER"
    filter: FilterValuesType
    id: string
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const todoListReducer = (todoLists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD_TODOLIST":
            return [{id: action.id, title: action.title, filter: "all"}, ...todoLists];
        case "CHANGE_TODOLIST_TITLE":
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        case "CHANGE_TODOLIST_FILTER":
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}
export const RemoveTodoListActionCreator = (todoListID: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE_TODOLIST",
        id: todoListID
    }
}

export const AddTodoListActionCreator = (title: string, id: string): AddTodoListActionType => {
    return {
        type: "ADD_TODOLIST",
        title,
        id,
    }
}
export const ChangeTodoListTitleActionCreator = (newTitle: string, id: string): ChangeTodoListTitleActionType => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        id,
        newTitle,
    }
}
export const ChangeTodoListFilterActionCreator = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        filter,
        id,
    }
}