import React, { useState } from 'react';
import { Task } from '../models/Task';
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai"
import "./TaskNote.css"

interface Props {
    task: Task;
    handleDelete: (id: number) => void;
    handleDone: (id: number) => void;
    handleEdit: (id: number, text: string) => void;
}

export default function TaskNote({ task, handleDelete, handleDone, handleEdit }: Props) {
    const [isEdit, setIsEdit] = useState(false);
    const [editText, setEditText] = useState(task.text);

    return (
        <form className='task-note'
            onSubmit={e => {
                e.preventDefault();
                handleEdit(task.id, editText);
                setIsEdit(false);
            }}>

            {isEdit ? (
                <input className='task-note-text'
                    value={editText}
                    onChange={e => setEditText(e.target.value)}/>
            ) : (
                task.isDone ? (
                    <s className='task-note-text'>{task.text}</s>
                ) : (
                    <span className='task-note-text'>{task.text}</span>
                )
            )}

            <div>
                <span className="icon" onClick={() => setIsEdit(true)}>
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(task.id)}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(task.id)}>
                    <AiOutlineCheck />
                </span>
            </div>
        </form>
    );
}