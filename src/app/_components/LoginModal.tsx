import { signIn } from "next-auth/react";

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  const handleFacebookLogin = async () => {
    try {
      await signIn("facebook", {
        callbackUrl: `${window.location.origin}`,
      });
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Login to your account</h2>
        <button
          onClick={handleFacebookLogin}
          className="w-full py-2 mb-2 bg-blue-600 text-white rounded-lg flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Continue with Facebook
        </button>
        <button
          onClick={() => signIn("google")}
          className="w-full py-2 mb-2 bg-red-600 text-white rounded-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.806q-.275 1.123-1.265 1.958t-2.53 1.272q-3.106 0-3.106-2.87v-1.285h6.116v-2.3h-6.116V8.25q0-.748.382-1.332t1.118-.986q1.345-.518 3.162-.518 1.054 0 1.943.116t1.752.348l.179 1.475-1.147 1.147q-.654-.319-1.589-.319-.925 0-1.579.654t-.654 1.579v1.147h2.87l-.189 2.3h-2.681z"/>
          </svg>
          Continue with Google
        </button>
        {/* Add more providers as needed */}
      </div>
    </div>
  );
}