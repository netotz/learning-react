import React from "react";
import { Task } from "../models/Task";
import { TasksDict } from "../types/TasksDict";
import TaskNote from "./TaskNote";

interface Props {
    tasks: TasksDict;
    setTasks: (t: TasksDict) => void;
}

export default function TasksList({ tasks, setTasks }: Props) {
    function handleDelete(taskId: number) {
        const modTasks = new Map(tasks);
        modTasks.delete(taskId);
        setTasks(modTasks);
    }

    function handleDone(taskId: number) {
        const modTasks = new Map(tasks);
        let task = modTasks.get(taskId)!;
        task.isDone = !task.isDone;
        modTasks.set(taskId, task);
        setTasks(modTasks);
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
