"use client";

import type { FC, FormEvent } from "react";
import { useEffect } from "react";
import Link from "next/link";

const SignupPage: FC = () => {
  useEffect(() => {
    // Only handle footer blur and body scroll
    const footer = document.querySelector("#footer");
    document.body.style.overflow = "hidden";
    const noticebar = document.querySelector("#noticebar");
    if (noticebar) noticebar.classList.add("hidden");
    if (footer) footer.classList.add("blur-sm");

    // Cleanup when component unmounts
    return () => {
      if (footer) footer.classList.remove("blur-sm");
      document.body.style.overflow = "unset";
      if (noticebar) noticebar.classList.remove("hidden");
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[998] bg-black bg-opacity-50" />

      {/* Modal */}
      <div className="fixed inset-0 z-[999] flex items-start justify-center overflow-hidden">
        <div
          className="relative mx-auto mt-[70px] h-auto w-[752px] rounded-2xl border border-gray-300 bg-white p-[5.5rem] px-[7rem]"
          style={{
            animation: "0.25s ease-out 0s 1 normal none running zoomIn",
          }}
        >
          <Link href="/">
            <div
              role="button"
              className="absolute right-6 top-6 cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 512 512">
                <path
                  fill="#2e3a4a"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                />
              </svg>
            </div>
          </Link>

          <div className="mx-auto max-w-[25.25rem] text-center">
            <h1 className="m-0 text-center text-[24px] text-[#2e3a4a]">
              <b className="font-extrabold">Create your account</b>
            </h1>

            <div className="text-center leading-6 text-[#6d7580]">
              <div className="mx-auto max-w-[25.25rem]">
                <button
                  className="duration-250 relative mx-auto mb-2 mt-6 block min-h-[3rem] w-full min-w-[190px] rounded-md border border-[#1877f2] bg-[#1877f2] p-3 px-6 text-[1rem] font-semibold leading-[1.5rem] transition hover:bg-[#1158b4]"
                  type="submit"
                  name="action"
                >
                  <span className="flex justify-center">
                    <span className="mr-1 flex items-center justify-center">
                      <svg
                        width="18px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#fff"
                          d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"
                        />
                      </svg>
                    </span>
                    <span className="ml-1 text-[16px] font-semibold text-white">
                      Sign in with Facebook
                    </span>
                  </span>
                </button>

                <button
                  className="duration-250 relative mx-auto mb-2 mt-6 mt-[16px] block min-h-[3rem] w-full min-w-[190px] rounded-md border border-[#000] bg-[#000] p-3 px-6 text-[1rem] font-semibold leading-[1.5rem] transition"
                  type="submit"
                  name="action"
                >
                  <span className="text-[16px] font-semibold text-white">
                    Sign in with Apple
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center font-bold text-[#6d7580]">
              <span className="mr-3 block h-px w-full bg-[#d5d7db]"></span>
              <span>or</span>
              <span className="ml-3 block h-px w-full bg-[#d5d7db]"></span>
            </div>

            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="relative my-2 text-left">
                <div className="mb-1">
                  <div className="mb-4">
                    <input
                      placeholder="First Name"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
                      type="text"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder="Email"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
                      type="text"
                    />
                  </div>
                  <div className="relative mb-4">
                    <input
                      placeholder="Password"
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <div className="duration-250 mt-4 w-full transition">
                <button
                  className="duration-250 relative mx-auto mb-2 mt-6 block min-h-[3rem] w-full min-w-[190px] rounded-md border border-[#058a8a] bg-[#058a8a] p-3 px-6 text-[1rem] font-semibold leading-[1.5rem] transition hover:bg-[#0aabab]"
                  type="submit"
                >
                  <span className="text-[16px] font-semibold text-white">
                    Sign up
                  </span>
                </button>
              </div>
            </form>

            <div>
              <p className="text-text-secondary my-8 text-[0.875rem] font-normal leading-[1.25rem]">
                By using this website you are agreeing to our{" "}
                <a
                  href="https://www.realestate.com.au/legal/privacy-policy"
                  className="underline"
                >
                  <b>
                    Personal Information Collection Statement, Terms &
                    Conditions and Privacy Policy.
                  </b>
                </a>
              </p>
            </div>

            <div className="mt-4 flex justify-center">
              <span className="mr-1 text-center leading-6 text-[#6d7580]">
                Already have an account?
              </span>
              <Link
                href="/login"
                className="text-link-primary float-right mb-4 text-[1rem] font-normal leading-[1.5rem]"
              >
                <p className="text-link-primary m-0 text-[1rem] font-semibold leading-[1.5rem]">
                  Login here
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
