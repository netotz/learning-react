import React from "react";
import { Task } from "../models/Task";

interface Props {
    tasks: Task[];
    setTasks: (t: Task[]) => void;
}

export default function TasksList(
    { tasks, setTasks }: Props) {

    return <div className="tasks-list"></div>;
}
