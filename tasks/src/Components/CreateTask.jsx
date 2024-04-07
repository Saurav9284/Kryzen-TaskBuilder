import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";



const CreateTask = ({ tasks, setTasks }) => {
  const [newtask, setNewTask] = useState({
    id: "",
    name: "",
    status: "task",
  });


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://kryzen-task-builder-backend.vercel.app/api/task", { name: newtask.name,id:newtask.id,status: newtask.status });
      const { task, message } = response.data;
      setTasks((prevTasks) => [...prevTasks, task]);

      toast.success(message, { icon: "✅" });

      setNewTask({
        id: "",
        name: "",
        status: "task",
      });
    } catch (error) {
      console.error("Not Able to create task:", error);
      toast.error("Task Creation Faield", { icon: "❌" });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter task name.."
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-70 px-1"
        value={newtask.name}
        onChange={(e) =>
          setNewTask({ ...newtask, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="bg-green-700 rounded-md px-4 h-12 text-white">
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
