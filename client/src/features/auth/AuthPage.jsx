import { useState } from "react";
import AuthCard from "../../components/auth/AuthCard";
import AuthToggle from "../../components/auth/AuthToggle";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SocialLogin from "../../components/auth/SocialLogin";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <AuthCard>
        <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="mt-6">
          <SocialLogin />
        </div>
      </AuthCard>
    </div>
  );
}
