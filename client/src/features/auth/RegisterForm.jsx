import { useState } from "react";
import { register } from "./authService";
import { saveUserProfile } from "./userService";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      address,
      phone,
    } = formData;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const userCredential = await register(email, password);

      // Save additional profile data

      await saveUserProfile(userCredential.user.uid, {
        firstName,
        lastName,
        address,
        phone,
      });
      alert("Registration successful");
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
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="border p-2 rounded"
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

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <button type="submit" className="bg-blue-500 text-white py-2 rounded transition-colors">
        Register
      </button>
    </form>
  );
}
