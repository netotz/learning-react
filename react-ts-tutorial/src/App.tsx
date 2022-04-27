import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TasksList from "./components/TasksList";
import { sortTasks, Task } from "./models/Task";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleSubmit(newText: string) {
    if (newText === "")
      return;

    setTasks([...tasks, {
      id: Date.now(),
      text: newText,
      isDone: false,
      lastModified: new Date()
    }]);
  }

  return (
    <div className="App">
      <span className="heading">Taskify</span>

      <InputField handleSubmit={handleSubmit} />

      <TasksList tasks={sortTasks(tasks)}
        setTasks={setTasks} />
    </div>
  );
}
