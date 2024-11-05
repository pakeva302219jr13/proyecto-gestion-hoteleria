// src/pages/Login.tsx

import React from 'react';
import LoginForm from '../components/Login';

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
