import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Task } from './models/Task';

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (taskText == "")
      return;

    setTasks([...tasks, {
      id: Date.now(),
      text: taskText,
      isDone: false
    }])
    setTaskText("");
  }

  console.log(tasks);

  return (
    <div className="App">
      <span className="heading">Taskify</span>

      <InputField taskText={taskText}
        setTaskText={setTaskText}
        handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
