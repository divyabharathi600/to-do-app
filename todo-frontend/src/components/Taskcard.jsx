import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../auth';
import ShareModal from './ShareModal';
import { toast } from 'react-toastify';

function TaskCard({ task, onChange }) {
  const [showShare, setShowShare] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateStatus = async () => {
    try {
      setLoading(true);
      const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';

      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      toast.success(`Marked as ${updatedStatus}`);
      onChange();
    } catch (err) {
      console.error('Error updating task status:', err);
      toast.error('Failed to update task status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      toast.success('Task deleted');
      onChange();
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white p-4 rounded-xl shadow-md border transition-opacity ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-500">{task.description}</p>
      <p className="text-xs text-gray-400 mt-1">
        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
      </p>
      <p className="text-xs mt-1">
        Status: <span className="font-semibold text-purple-600">{task.status}</span>
        {" • "}
        Priority: <span className="font-semibold text-orange-500">{task.priority}</span>
      </p>

      <div className="flex justify-between mt-4 text-sm">
        <button onClick={updateStatus} className="text-blue-500 hover:underline">
          {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <div className="flex gap-4">
          <button onClick={() => setShowShare(true)} className="text-yellow-500 hover:underline">Share</button>
          <button onClick={handleDelete} className="text-red-500 hover:underline">Delete</button>
        </div>
      </div>

      {showShare && (
        <ShareModal
          taskId={task._id}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}

export default TaskCard;
