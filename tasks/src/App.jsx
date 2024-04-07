import React, { lazy, useEffect, useState } from "react";
const CreateTask = lazy(() => import("./Components/CreateTask"));
const GetTask = lazy(() => import("./Components/GetTask"));


import toast,{ Toaster } from "react-hot-toast";
import axios from "axios";
const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://kryzen-task-builder-backend.vercel.app/api/task");
        setTasks(response.data);
        toast.success("Data Fetched", { icon: "✅" });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks", { icon: "❌" });
      }
    };

    fetchTasks();
  }, []);

  
  return (
    <>
  <Toaster />
  <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-32 gap-16">
  <h1 className="text-3xl font-bold mb-8" style={{ background: 'linear-gradient(90deg, rgba(228,53,159,1) 26%, rgba(194,76,219,1) 42%, rgba(188,230,137,1) 70%, rgba(156,10,81,1) 100%, rgba(9,9,117,1) 100%, rgba(0,212,255,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Task-Builder</h1>
    <button onClick={handleDownload} className="bg-cyan-700 rounded-md px-4 h-12 text-white absolute top-8">
      Download task as PDF
    </button>
    <CreateTask tasks={tasks} setTasks={setTasks} />
    <GetTask tasks={tasks} setTasks={setTasks} />

  </div>
</>

  );
};

export default App;
