import React, { lazy, useEffect, useState } from "react";
import Select from "react-select";
const CreateTask = lazy(() => import("./Components/CreateTask"));
const GetTask = lazy(() => import("./Components/GetTask"));

import toast,{ Toaster } from "react-hot-toast";
import axios from "axios";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(null); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let url = "https://kryzen-task-builder-backend.vercel.app/api/task";
        if (filter) {
          url += `?dateRange=${filter}`;
        }
        const response = await axios.get(url);
        setTasks(response.data);
        toast.success("Data Fetched", { icon: "✅" });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks", { icon: "❌" });
      }
    };

    fetchTasks();
  }, [filter]);

  const handleDownload = async () => {
    //  download PDF
  };

  const options = [
    { value: "", label: "Select Filter" },
    { value: "today", label: "Today" },
    { value: "lessThan5Days", label: "Less than 5 days" },
    { value: "moreThan5Days", label: "More than 5 days" }
  ];

  return (
    <>
    <Toaster />
    <div className="w-screen h-screen flex flex-col items-center pt-32 gap-16 relative">
      <h1 className="text-3xl font-bold mb-8 absolute top-8 left-5" style={{ background: 'linear-gradient(90deg, rgba(228,53,159,1) 26%, rgba(194,76,219,1) 42%, rgba(188,230,137,1) 70%, rgba(156,10,81,1) 100%, rgba(9,9,117,1) 100%, rgba(0,212,255,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingLeft: '16px', paddingTop: '16px' }}>Task-Builder</h1>
      <button onClick={handleDownload} className="bg-cyan-700 rounded-md px-4 h-12 text-white absolute top-8 right-8">
        Download task as PDF
      </button>
      <Select
        options={options}
        value={options.find(option => option.value === filter)}
        onChange={(selectedOption) => setFilter(selectedOption.value)}
        placeholder="Select Filter"
        className="w-64 " 
      />
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <GetTask tasks={tasks} setTasks={setTasks} />
    </div>
  </>
  );
};

export default App;
