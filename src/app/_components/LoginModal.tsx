import { signIn } from "next-auth/react";

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Login to your account</h2>
        <button
          onClick={() => signIn("facebook")}
          className="w-full py-2 mb-2 bg-blue-600 text-white rounded-lg"
        >
          Sign in with Facebook
        </button>
        <button
          onClick={() => signIn("google")}
          className="w-full py-2 mb-2 bg-red-600 text-white rounded-lg"
        >
          Sign in with Google
        </button>
        {/* Add more providers as needed */}
      </div>
    </div>
  );
}