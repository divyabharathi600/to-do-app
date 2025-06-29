import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-purple-700">📝 Todo Manager</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
