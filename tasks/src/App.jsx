import React, { lazy, useEffect, useState } from "react";
import Select from "react-select";
import { jsPDF } from "jspdf";
const CreateTask = lazy(() => import("./Components/CreateTask"));
const GetTask = lazy(() => import("./Components/GetTask"));

import toast, { Toaster } from "react-hot-toast";
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
    try {
      const pdf = new jsPDF();
      pdf.text("Tasks", 10, 10);
      pdf.text(document.getElementById("get-task").innerText, 10, 50);
      pdf.save("tasks.pdf");
      toast.success("PDF Downloaded Successfully", { icon: "✅" });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download PDF", { icon: "❌" });
    }
  };

  const options = [
    { value: "", label: "Select Filter" },
    { value: "today", label: "Today" },
    { value: "lessThan5Days", label: "Less than 5 days" },
    { value: "moreThan5Days", label: "More than 5 days" },
  ];

  return (
    <>
      <Toaster />
      <div className="w-screen h-screen flex flex-col items-center pt-32 gap-16 relative">
        <h1
          className="text-3xl font-bold mb-8 absolute top-3 left-5"
          style={{
            background:
              "linear-gradient(90deg, rgba(228,53,159,1) 26%, rgba(194,76,219,1) 42%, rgba(188,230,137,1) 70%, rgba(156,10,81,1) 100%, rgba(9,9,117,1) 100%, rgba(0,212,255,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            paddingLeft: "16px",
            paddingTop: "16px",
          }}
        >
          Task-Builder
        </h1>
        <div className="absolute top-8 right-8 flex gap-4">
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <button
            onClick={handleDownload}
            className="bg-cyan-700 rounded-md px-4 h-12 text-white"
          >
            Download PDF
          </button>
        </div>
        <Select
          options={options}
          value={options.find((option) => option.value === filter)}
          onChange={(selectedOption) => setFilter(selectedOption.value)}
          placeholder="Select Filter"
          className="w-64"
        />
        <div id="get-task">
          <GetTask tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
};

export default App;
