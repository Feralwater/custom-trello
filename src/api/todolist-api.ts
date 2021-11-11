import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0c3d5653-613c-4c0d-81ff-d4a91287f91a'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    },
    getTodo() {
        return instance.get<Array<TodoType>>('/todo-lists')
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    createTodoTitle(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('/todo-lists', {title})
    }
}

type CommonResponseType<T = {}> = {
    fieldsError: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}