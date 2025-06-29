import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../auth';

function TaskForm({ onClose, onChange }) {
  const [form, setForm] = useState({
    title: '', description: '', dueDate: '', priority: 'medium'
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', form, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    onChange();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4">New Task</h2>
        <input name="title" required value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 mb-3 rounded-md" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 mb-3 rounded-md"></textarea>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full border p-2 mb-3 rounded-md" />
        <select name="priority" value={form.priority} onChange={handleChange} className="w-full border p-2 mb-3 rounded-md">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Create</button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
