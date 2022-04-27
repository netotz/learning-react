import React, { useState } from "react";
import "./InputField.css";

interface Props {
    handleSubmit: (t: string) => void;
}

export default function InputField({ handleSubmit }: Props) {
    const [taskText, setTaskText] = useState("");

    return (
        <form className="input-form"
            onSubmit={e => {
                e.preventDefault();
                handleSubmit(taskText);
                setTaskText("");
            }}>

            <input type="input" placeholder="What's the next task?"
                value={taskText}
                onChange={e => setTaskText(e.target.value)}
                className="input-box"></input>

            <button className="input-submit" type="submit">Add</button>
        </form>
    );
}
