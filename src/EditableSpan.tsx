import React, {KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = ({title, onChange}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [task, setTask] = useState<string>('');
    const activateEditMode = () => {
        setEditMode(true);
        setTask(title);
    }
    const activateViewEMode = () => {
        setEditMode(false);
        onChange(task);
    }
    const onKeyPressHandler = ({charCode}: KeyboardEvent<HTMLInputElement>) => {
        if (charCode === 13) {
            setEditMode(false);
            onChange(task);
        }
    }
    return editMode
        ? <TextField value={task}
                     onBlur={activateViewEMode}
                     autoFocus
                     onChange={(e) => setTask(e.currentTarget.value)}
                     onKeyPress={onKeyPressHandler}
                     variant={"standard"}
                     color={"success"}
        />
        : <span onDoubleClick={activateEditMode}>{title}</span>
}