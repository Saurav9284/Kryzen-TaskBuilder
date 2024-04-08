const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ["task", "in progress", "done", "rework"], required: true },
    id: { type: String }, 
    created_at: { type: Date, default: Date.now } 
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;

