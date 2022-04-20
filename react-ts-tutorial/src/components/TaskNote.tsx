import React from 'react';
import { Task } from '../models/Task';
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai"
import "./TaskNote.css"

interface Props {
    task: Task;
    handleDelete: (id: number) => void;
    handleDone: (id: number) => void;
}

export default function TaskNote({task, handleDelete, handleDone}: Props) {
  return (
    <form className='task-note'>
        {task.isDone ? (
            <s className='task-note-text'>{task.text}</s>
        ) : (
            <span className='task-note-text'>{task.text}</span>
        )}

        <div>
            <span className="icon"><AiFillEdit/></span>
            <span className="icon" onClick={() => handleDelete(task.id)}>
                <AiFillDelete/>
            </span>
            <span className="icon" onClick={() => handleDone(task.id)}>
                <AiOutlineCheck/>
            </span>
        </div>
    </form>
  );
}