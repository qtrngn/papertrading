import { useState } from "react";
import { login } from "./authService";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      alert("Logged in successfully!");
    } catch (err) {
      alert(err.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="border p-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-colors"
      >Login</button>
    </form>
  );
}
