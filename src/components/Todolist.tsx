import React, {useCallback} from 'react';
import {FilterValuesType} from './App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo(function ({addTask, id, changeFilter, ...props}: PropsType) {

    const addItem = useCallback((title: string) => addTask(title, id), [addTask, id]);
    const removeTodoList = () => props.removeTodoList(id);
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(id, title);
    const onAllClickHandler = useCallback(() => changeFilter("all", id), [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [changeFilter, id]);

    return <div>
        <div style={{display: "flex", justifyContent: "space-between", margin: "0 0 10px 0"}}>
            <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            <Button
                variant="outlined"
                startIcon={<Delete/>}
                color={"success"}
                onClick={removeTodoList}
            >Delete</Button>
        </div>
        <AddItemForm addItem={addItem}/>
        <List>
            {
                props.tasks.map(task => <Task key={task.id}
                                              task={task}
                                              removeTask={props.removeTask}
                                              changeTaskStatus={props.changeTaskStatus}
                                              changeTaskTitle={props.changeTaskTitle}
                                              todoListId={id}
                />)
            }
        </List>
        <div>
            <Button color={props.filter === 'all' ? "secondary" : "success"}
                    onClick={onAllClickHandler}
            >All
            </Button>
            <Button color={props.filter === 'active' ? "secondary" : "success"}
                    onClick={onActiveClickHandler}
            >Active
            </Button>
            <Button color={props.filter === 'completed' ? "secondary" : "success"}
                    onClick={onCompletedClickHandler}
            >Completed
            </Button>
        </div>
    </div>
})