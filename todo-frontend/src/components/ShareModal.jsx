import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../auth';
import { toast } from 'react-toastify';

function ShareModal({ taskId, onClose }) {
  const [email, setEmail] = useState('');

  const handleShare = async () => {
    try {
      await axios.post(`http://localhost:5000/api/tasks/share/${taskId}`, { email }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      toast.success('Task shared successfully!');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to share task.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80">
        <h2 className="text-xl font-semibold mb-4">Share Task</h2>
        <input
          type="email"
          placeholder="Enter user email"
          className="w-full border p-2 mb-4 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
          <button onClick={handleShare} className="bg-green-600 text-white px-4 py-2 rounded-md">Share</button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
