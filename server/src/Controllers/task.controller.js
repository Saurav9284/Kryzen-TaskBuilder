const express = require('express');
const TaskModel = require('../Models/task.model');
const authorization = require('../Middlewares/authorization');
// const PDFDocument = require('pdfkit')
// const multer = require('multer')
// const upload = multer({ dest: '/tmp/uploads/' })


const TaskController = express.Router();

// Get tasks 

TaskController.get('/task', async (req, res) => {
  try {
      let query = {}
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (req.query.dateRange === 'today') {
          query.created_at = { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) };
      } else if (req.query.dateRange === 'lessThan5Days') {
          const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);
          query.created_at = { $gte: fiveDaysAgo };
      } else if (req.query.dateRange === 'moreThan5Days') {
          const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);
          query.created_at = { $lt: fiveDaysAgo };
      }
      const tasks = await TaskModel.find(query);
      res.send(tasks);
  } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});


  
  // Create a new task

  TaskController.post('/task', async (req, res) => {
    try {
      const { name, status ,id , complete_date} = req.body;
      const task = await TaskModel.create({ name, status ,id, complete_date});
      await task.save();
      res.status(201).json({ task, message: 'Task created successfully' });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Update task status

  TaskController.put('/task/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await TaskModel.findByIdAndUpdate(id, { status });
      res.json({ message: 'Task status updated successfully' });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // PDF

//   TaskController.get('/task/pdf', async (req, res) => {
//     try {
//         let query = {}
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         if (req.query.dateRange === 'today') {
//             query.created_at = { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) };
//         } else if (req.query.dateRange === 'lessThan5Days') {
//             const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);
//             query.created_at = { $gte: fiveDaysAgo };
//         } else if (req.query.dateRange === 'moreThan5Days') {
//             const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);
//             query.created_at = { $lt: fiveDaysAgo };
//         }
//         const tasks = await TaskModel.find(query);

//         // Generate PDF
//         const pdfDoc = new PDFDocument();
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', 'attachment; filename="tasks.pdf"');
//         pdfDoc.pipe(res);

//         // Add content to the PDF
//         tasks.forEach(task => {
//             pdfDoc.text(`Name: ${task.name}`);
//             pdfDoc.text(`Status: ${task.status}`);
//             pdfDoc.text(`Date: ${task.created_at}`);
//             pdfDoc.moveDown();
//         });
//         pdfDoc.end();

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ error: 'Internal Server Error' });
//     }
// });


  
  // Delete a task
  
  TaskController.delete('/task/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await TaskModel.findByIdAndDelete(id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = TaskController;
