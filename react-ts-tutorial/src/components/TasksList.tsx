import React from "react";
import { Task } from "../models/Task";
import TaskNote from "./TaskNote";

interface Props {
    tasks: Task[];
    setTasks: (t: Task[]) => void;
}

export default function TasksList({ tasks, setTasks }: Props) {
    function handleDelete(taskId: number) {
        setTasks(tasks.filter(task => task.id != taskId));
    }

    function handleDone(taskId: number) {
        setTasks(tasks.map(task => {
            if (task.id == taskId) {
                task.isDone = !task.isDone;
            }
            return task;
        }));
    }

    return (
        <div className="tasks-list">
            {Array.from(tasks.values(), task =>
                <TaskNote task={task}
                    handleDelete={handleDelete}
                    handleDone={handleDone} />
            )}
        </div>
    );
}
