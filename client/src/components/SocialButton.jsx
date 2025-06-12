import React from 'react';


const SocialLoginButton = ({ 
    provider, 
    onClick, 
    disabled = false 
  }) => {
    const providers = {
      google: {
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.1H2.18V16.94C4 20.53 7.7 23 12 23Z" fill="#34A853"/>
            <path d="M5.84 14.1C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.9V7.06H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.94L5.84 14.1Z" fill="#FBBC05"/>
            <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 4 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EA4335"/>
          </svg>
        ),
        bgColor: "bg-white hover:bg-gray-100",
        borderColor: "border-gray-300",
        text: "Google"
      },
      apple: {
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0509 12.3098C17.0313 10.2496 18.6841 9.05878 18.7691 8.9888C17.7914 7.54108 16.2275 7.34136 15.6509 7.32064C14.3539 7.16376 13.1031 8.14024 12.4847 8.14024C11.8459 8.14024 10.7925 7.34136 9.68474 7.3604C8.20314 7.37944 6.86994 8.23528 6.15074 9.56544C4.65794 12.119 5.77654 16.3516 7.22934 18.4364C7.95534 19.5036 8.81814 20.7036 9.94534 20.6556C11.0325 20.5972 11.4459 19.9208 12.7959 19.9208C14.1255 19.9208 14.5199 20.6556 15.6663 20.626C16.8525 20.5972 17.5785 19.5524 18.2751 18.4756C19.0975 17.288 19.4343 16.1316 19.4535 16.0728C19.4247 16.0538 17.0695 15.0308 17.0509 12.3098Z" />
            <path d="M14.712 6.34392C15.354 5.55272 15.7639 4.49464 15.6579 3.43656C14.7447 3.47544 13.6095 4.03128 12.9287 4.80312C12.3359 5.46616 11.8223 6.5628 11.9479 7.58136C12.9895 7.65944 14.0215 7.08408 14.712 6.34392Z" />
          </svg>
        ),
        bgColor: "bg-black hover:bg-gray-900",
        borderColor: "border-gray-700",
        text: "Apple"
      }
    };
  
    const { icon, bgColor, borderColor, text } = providers[provider] || {};
  
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center p-3 rounded-full ${bgColor} border ${borderColor} transition-colors`}
        aria-label={`Sign in with ${text}`}
      >
        {icon}
      </button>
    );
  };
  
  export default SocialLoginButton;