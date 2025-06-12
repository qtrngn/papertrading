// features/auth/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import background from '../../../public/background.jpeg'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (

  <div 
  className="h-screen w-screen overflow-hidden"
  style={{ 
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),url(${background})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' }}
  >
    <div className="h-screen w-3xl bg-[#08090a] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
         
          <h1 className="text-3xl font-bold text-white">Paper Trading</h1>
          <p className="mt-2 text-gray-300">
            {activeTab === 'login' 
              ? 'Login to your account' 
              : 'Create a new account'}
          </p>
        </div>

        <div className=" bg-[#131415] rounded-xl shadow-xl overflow-hidden flex flex-col h-[600px] sm:h-[640px] lg:h-[680px]">
          <div className="flex border-b border-white">
            <button
              className={`flex-1 py-5 text-center transition-colors duration-300${
                activeTab === 'login'
                  ? 'text-white neon-button'
                  : 'text-gray-400 hover:bg-gray-750'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-5 text-center transition-colors duration-300 ${
                activeTab === 'register'
                  ? 'text-white neon-button'
                  : 'text-gray-400 hover:bg-gray-750'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          <div className="p-8 flex-1 overflow-y-auto">
            {activeTab === 'login' ? (
              <LoginForm onSwitch={() => setActiveTab('register')} />
            ) : (
              <RegisterForm onSwitch={() => setActiveTab('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthPage;