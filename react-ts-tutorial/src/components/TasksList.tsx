import React from "react";
import { Task } from "../models/Task";

interface TasksListProps {
    tasks: Task[];
    setTasks: (t: Task[]) => void;
}

function TasksList({tasks, setTasks}: TasksListProps) {
    return (
        <div className="tasks-list">
            
        </div>
    );
}

export default TasksList;