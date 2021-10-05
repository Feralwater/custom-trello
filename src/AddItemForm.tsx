import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = ({charCode}: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        const newTitle = title.trim();
        if (newTitle !== "") {
            addItem(newTitle);
            setTitle("");
        } else {
            setError("error");
        }
    }
    return (
        <div>
            <TextField value={title}
                       onChange={onChangHandler}
                       onKeyPress={onKeyPressHandler}
                       variant={"outlined"}
                       size={"small"}
                       color={"success"}
                       error={!!error}
                       label={"Title"}
                       helperText={error && "Title is required"}
            />
            <IconButton
                onClick={addTask}
                color={"success"}
            >
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;