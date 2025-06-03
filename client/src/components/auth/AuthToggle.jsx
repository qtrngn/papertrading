export default function AuthToggle({ isLogin, setIsLogin }) {
  return (
    <div className="flex border-b mb-6">
      <button
        className={`py-2 px-4 font-medium ${
          isLogin
            ? "border-b-2 border-blue-500 text-blue-600"
            : "text-gray-500 hover:text-blue-500"
        }`}
        onClick={() => setIsLogin(true)}
      >
        Login
      </button>

      <button
        className={`py-2 px-4 font-medium ${
          isLogin
            ? "border-b-2 border-blue-500 text-blue-600"
            : "text-gray-500 hover:text-blue-500"
        }`}
        onClick={() => setIsLogin(true)}
      >
        Register
      </button>
    </div>
  );
}
