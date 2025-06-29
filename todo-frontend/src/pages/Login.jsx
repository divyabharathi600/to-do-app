function Login() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Todo Manager</h1>
        <p className="mb-6 text-gray-500">Login with Google to continue</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
