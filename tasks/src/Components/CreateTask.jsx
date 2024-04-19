import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";

const CreateTask = ({ tasks, setTasks }) => {
  const [newtask, setNewTask] = useState({
    id: "",
    name: "",
    status: "task",
    complete_date: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://kryzen-task-builder-backend.vercel.app/api/task", { name: newtask.name, id: newtask.id, status: newtask.status });
      const { task, message } = response.data;
      setTasks((prevTasks) => [...prevTasks, task]);

      toast.success(message, { icon: "✅" });

      setNewTask({
        id: "",
        name: "",
        status: "task",
        complete_date: ""
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Not Able to create task:", error);
      toast.error("Task Creation Failed", { icon: "❌" });
    }
  };

 const handleInputChange = (e) => {
    setNewTask({ ...newtask, id: uuidv4(), name: e.target.value , complete_date: e.target.value});
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="bg-green-700 rounded-md px-4 h-12 text-white">Create Task</button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-full max-w-md p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Enter task name.."
                type="text"
                className="border-2 border-gray-300 rounded-md mb-4 h-12 w-full px-2"
                value={newtask.name}
                onChange={handleInputChange}
              />
               <input
                  placeholder="Choose Date"
                  type="date"
                  name="complete_date"
                  value={newtask.complete_date}
                  onChange={handleInputChange}
                />
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">Save</button>
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTask;
