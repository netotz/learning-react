import React from "react";
import "./InputField.tsx.css";

interface ITaskTextProps {
    taskText: string;
    setTaskText: (t: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

function InputField({taskText, setTaskText, handleSubmit}: ITaskTextProps) {
    return (
        <form className="input-form"
            onSubmit={e => handleSubmit(e)}>

            <input type="input" placeholder="What's the next task?"
                value={taskText}
                onChange={e => setTaskText(e.target.value)}
                className="input-box"></input>

            <button className="input-submit" type="submit">Add</button>
        </form>
    );
}

export default InputField;
