import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

export function Todolist(props: PropsType) {

    const addItem = (title: string) => props.addTask(title, props.id);
    const removeTodoList = () => props.removeTodoList(props.id);
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.id, title);
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

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
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }
                    return (
                        <ListItem style={{padding: 0}} key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox onChange={onChangeStatusHandler}
                                      checked={t.isDone}
                                      color={"success"}
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton
                                size="small"
                                aria-label="delete"
                                onClick={onClickHandler}
                            >
                                <Delete/>
                            </IconButton>
                        </ListItem>)
                })
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
}

