import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TasksList from "./components/TasksList";
import { Task } from "./models/Task";
import { TasksDict } from "./types/TasksDict";

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<TasksDict>(new Map<number, Task>());

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (taskText == "") return;

    const modTasks = tasks;
    const newId = Date.now();
    modTasks.set(newId, {
      id: newId,
      text: taskText,
      isDone: false,
    });

    setTasks(modTasks);
    setTaskText("");
  }

  return (
    <div className="App">
      <span className="heading">Taskify</span>

      <InputField
        taskText={taskText}
        setTaskText={setTaskText}
        handleSubmit={handleSubmit}
      />

      <TasksList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
