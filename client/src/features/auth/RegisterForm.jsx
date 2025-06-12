// features/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { register, signInWithGoogle } from './authService';

const RegisterForm = ({ onSwitch }) => {
  const [userData, setUserData] = useState({ 
    displayName: '',
    email: '', 
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
    
    // Clear password error when typing
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Password confirmation
    if (userData.password !== userData.confirmPassword) {
      setPasswordError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    // Required
    if (!userData.displayName || !userData.email || !userData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    try {
      await register(
        userData.email, 
        userData.password, 
        userData.displayName,
        userData.phone,
        userData.address,
        userData.country
      );
      // Redirect on success
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message || 'Google sign-up failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-white mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="name"
          required
          value={userData.displayName}
          onChange={handleChange}
          className="neon-input"
          placeholder="John Doe"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={userData.email}
            onChange={handleChange}
            className="neon-input"
            placeholder="email@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={userData.phone}
            onChange={handleChange}
            className="neon-input"
            placeholder="+1 234 567 890"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={userData.password}
            onChange={handleChange}
            className="neon-input"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-gray-400">
            At least 8 characters with numbers and letters
          </p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={userData.confirmPassword}
            onChange={handleChange}
            className="neon-input"
            placeholder="••••••••"
          />
          {passwordError && (
            <p className="mt-1 text-xs text-red-400">{passwordError}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-white mb-1">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          value={userData.address}
          onChange={handleChange}
          className="neon-input"
          placeholder="123 Main St, City"
        />
      </div>
      
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
          Country
        </label>
        <input
          id="country"
          name="country"
          value={userData.country}
          onChange={handleChange}
          className="neon-input"
        >
          
        </input>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="neon-button"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
      
      <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
         
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-transparent text-gray-400 mt-4">
              Or Sign up with
            </span>
        </div>
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-base font-medium text-gray-300 border bg-black hover:bg-gray-900 transition"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
          <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.1H2.18V16.94C4 20.53 7.7 23 12 23Z" fill="#34A853"/>
          <path d="M5.84 14.1C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.9V7.06H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.94L5.84 14.1Z" fill="#FBBC05"/>
          <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 4 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EA4335"/>
        </svg>
        Sign up with Google
      </button>
      
      <div className="text-center text-sm text-gray-400">
        <p>
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="neon-text-button"
          >
            Login
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;