import React from "react";
import "./InputField.css";

interface Props {
    taskText: string;
    setTaskText: (t: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function InputField(
    { taskText, setTaskText, handleSubmit }: Props) {
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
