import React from "react";
import { sortTasks, Task } from "../models/Task";
import TaskNote from "./TaskNote";

interface Props {
    tasks: Task[];
    setTasks: (t: Task[]) => void;
}

export default function TasksList({ tasks, setTasks }: Props) {
    function handleDelete(taskId: number) {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    function handleDone(taskId: number) {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                task.isDone = !task.isDone;
                task.lastModified = new Date();
            }
            return task;
        }));
    }
    
    function handleEdit(taskId: number, newText: string) {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                task.text = newText;
                task.lastModified = new Date();
            }
            return task;
        }));
    }

    return (
        <div className="tasks-list">
            {tasks.map(task =>
                <TaskNote task={task}
                    handleDelete={handleDelete}
                    handleDone={handleDone}
                    handleEdit={handleEdit} />
            )}
        </div>
    );
}
