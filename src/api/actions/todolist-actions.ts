import {useEffect, useState} from 'react'
import {todolistAPI} from "../todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodo().then((res: any) => {
            setState(res.data);
        })
    }, [])

}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodoTitle("Title1")
            .then((res) => {
                setState(res.data);
            })
    }, [])

}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "7bb27071-379a-424e-93dc-48dab767f877";
        todolistAPI.deleteTodo(todolistId).then((res) => {
            setState(res.data);
        })
    }, [])

}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "194555ce-3f76-4161-80bf-77e7bca7393b"
        todolistAPI.updateTodolist(todolistId, 'REACT>>>>>>>>>').then((res) => {
            setState(res.data)
        })
    }, [])

}
