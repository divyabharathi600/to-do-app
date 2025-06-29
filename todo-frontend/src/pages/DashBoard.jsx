import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, logout } from '../auth';  // ✅ include logout here
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import TaskCard from '../components/Taskcard';
import TaskForm from '../components/TaskForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:5000');

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }

    if (!getToken()) {
      navigate('/');
    }

    fetchTasks();

    socket.on('taskUpdated', fetchTasks);

    return () => socket.off('taskUpdated');
  }, [navigate]);

  // ✅ Logout handler
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + New Task
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onChange={fetchTasks} />
        ))}
      </div>

      {showForm && (
        <TaskForm onClose={() => setShowForm(false)} onChange={fetchTasks} />
      )}
    </div>
  );
}

export default Dashboard;
