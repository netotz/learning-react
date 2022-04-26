import React, { useEffect, useRef, useState } from 'react';
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

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      inputRef.current?.focus();
      setEditText(task.text);
    }, [isEdit]);
    
    
    function saveEdit() {
        handleEdit(task.id, editText);
        setIsEdit(false);
    }

    return (
        <form className={task.isDone ? "task-note task-done" : "task-note task-active"}
            onSubmit={e => {
                e.preventDefault();
                saveEdit();
            }}>

            {isEdit ? (
                <input className='task-note-text'
                    ref={inputRef}
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
                <span className="icon"
                    onClick={() => isEdit ? saveEdit() : setIsEdit(true)}>
                    <AiFillEdit />
                </span>
                <span className="icon"
                    onClick={() => {
                        if (task.isDone || window.confirm("Are you sure you want to delete this note?")) {
                            handleDelete(task.id);
                        }
                    }}>
                    <AiFillDelete />
                </span>
                <span className={isEdit ? "icon icon-disabled" : "icon"}
                    onClick={() => {
                        if (!isEdit)
                            handleDone(task.id)
                    }}>
                    <AiOutlineCheck />
                </span>
            </div>
        </form>
    );
}