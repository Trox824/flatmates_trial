"use client";

import type { FC, FormEvent } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';

const LoginPage: FC = () => {
  useEffect(() => {
    // Only handle footer blur and body scroll
    const footer = document.querySelector('#footer');
    document.body.style.overflow = 'hidden';
    const noticebar = document.querySelector('#noticebar');
    if (noticebar) noticebar.classList.add('hidden');
    if (footer) footer.classList.add('blur-sm');

    // Cleanup when component unmounts
    return () => {
      if (footer) footer.classList.remove('blur-sm');
      document.body.style.overflow = 'unset';
      if (noticebar) noticebar.classList.remove('hidden');
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[998]" />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[999] flex items-start justify-center overflow-hidden">
        <div 
          className="relative border border-gray-300 bg-white rounded-2xl w-[752px] h-auto mx-auto mt-[70px] p-[5.5rem] px-[7rem]"
          style={{ animation: "0.25s ease-out 0s 1 normal none running zoomIn" }}
        >
          <Link href="/">
            <div role="button" className="absolute right-6 top-6 cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 512 512">
                <path fill="#2e3a4a" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
              </svg>
            </div>
          </Link>

          <div className="max-w-[25.25rem] mx-auto text-center">
            <h1 className="text-[#2e3a4a] text-[24px] m-0 text-center">
              <b className="font-extrabold">Login to your account</b>
            </h1>

            <div className="text-[#6d7580] leading-6 text-center">
              <div className="max-w-[25.25rem] mx-auto">
                <button 
                  className="border mb-2 mt-6 w-full block mx-auto min-w-[190px] transition duration-250 text-[1rem] leading-[1.5rem] font-semibold relative rounded-md p-3 px-6 min-h-[3rem] bg-[#1877f2] border-[#1877f2] hover:bg-[#1158b4]"
                  type="submit"
                  name="action"
                >
                  <span className="flex justify-center">
                    <span className="mr-1 flex justify-center items-center">
                      <svg width="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff" d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z" />
                      </svg>
                    </span>
                    <span className="text-white ml-1 text-[16px] font-semibold">Sign in with Facebook</span>
                  </span>
                </button>

                <button 
                  className="border mb-2 mt-6 w-full block mx-auto min-w-[190px] transition duration-250 text-[1rem] leading-[1.5rem] font-semibold relative rounded-md p-3 px-6 min-h-[3rem] bg-[#000] border-[#000] mt-[16px]"
                  type="submit"
                  name="action"
                >
                  <span className="text-white text-[16px] font-semibold">Sign in with Apple</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center text-[#6d7580] font-bold mt-4">
              <span className="bg-[#d5d7db] block h-px mr-3 w-full"></span>
              <span>or</span>
              <span className="bg-[#d5d7db] block h-px ml-3 w-full"></span>
            </div>

            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="my-2 text-left relative">
                <div className="mb-1">
                  <div className="mb-4">
                    <input 
                      placeholder="Email or mobile"
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                      type="text"
                    />
                  </div>
                  <div className="relative mb-4">
                    <input 
                      placeholder="Password"
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4 text-[#6d7580] leading-6 text-center">
                <Link href="/forgot-password" className="float-right mb-4 text-link-primary text-[1rem] leading-[1.5rem] font-normal">
                  <p className="text-link-primary text-[1rem] leading-[1.5rem] font-semibold m-0">
                    Forgot your password?
                  </p>
                </Link>
              </div>

              <div className="mt-4 w-full transition duration-250">
                <button 
                  className="border mb-2 mt-6 w-full block mx-auto min-w-[190px] transition duration-250 text-[1rem] leading-[1.5rem] font-semibold relative rounded-md p-3 px-6 min-h-[3rem] bg-[#058a8a] border-[#058a8a] hover:bg-[#0aabab]"
                  type="submit"
                >
                  <span className="text-white text-[16px] font-semibold">Log in</span>
                </button>
              </div>
            </form>

            <div>
              <p className="text-text-secondary text-[0.875rem] leading-[1.25rem] font-normal my-8">
                By using this website you are agreeing to our{' '}
                <a href="https://www.realestate.com.au/legal/privacy-policy" className="underline">
                  <b>Personal Information Collection Statement, Terms & Conditions and Privacy Policy.</b>
                </a>
              </p>
            </div>

            <div className="flex justify-center mt-4">
              <span className="text-[#6d7580] leading-6 text-center mr-1">
                Don&apos;t have an account?
              </span>
              <Link href="/signup" className="float-right mb-4 text-link-primary text-[1rem] leading-[1.5rem] font-normal">
                <p className="text-link-primary text-[1rem] leading-[1.5rem] font-semibold m-0">
                  Create one here
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
