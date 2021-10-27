import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    todoListId: string
}

export const Task = React.memo(({
                                    task,
                                    removeTask,
                                    changeTaskStatus,
                                    changeTaskTitle,
                                    todoListId
                                }: TaskPropsType) => {
    const onClickHandler = () => removeTask(task.id, todoListId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todoListId);
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todoListId);
    }, [task.id, changeTaskTitle, todoListId]);
    return (
        <ListItem style={{padding: 0}} key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler}
                      checked={task.isDone}
                      color={"success"}
            />
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
            <IconButton
                size="small"
                aria-label="delete"
                onClick={onClickHandler}
            >
                <Delete/>
            </IconButton>
        </ListItem>)
})