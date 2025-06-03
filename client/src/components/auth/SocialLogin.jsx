import { loginWithGoogle } from "../../features/auth/authService";
import GoogleIcon from "../ui/GoogleIcon";

export default function SocialLogin() {
  return (
    <div className="mt-6">
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-gray-500 text-sm">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <GoogleIcon className="h-5 w-5" />
          Google
        </button>
      </div>
    </div>
  );
}
