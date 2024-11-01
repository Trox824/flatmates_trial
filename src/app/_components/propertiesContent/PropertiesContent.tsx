import React from 'react';
const PropertiesContent = () => {
  return (
    <section className="pr-[56px] w-[68%]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-banner-blue m-0" style={{ fontSize: '2rem', paddingRight: '4rem' }}>
          Forest Lodge, Sydney
        </h1>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <span className="inline-block text-banner-blue text-[0.875rem] font-medium px-2 py-1 border border-gray-800 rounded-md whitespace-nowrap">
            Free to message
          </span>
          <span className="inline-block text-banner-blue font-normal border-gray-800">
            Private room with shared bathroom
          </span>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-6 flex flex-wrap py-3 border-t border-b border-[#d5d7db]">
        <a className="mr-6 my-3 inline-block border border-[#d5d7db] rounded-lg min-w-[106px] p-2 text-center">
          <div className="text-[#2e3a4b] text-[1.5rem] leading-[2rem] text-center">
            $275<span className="text-[#6d7580] text-[1rem] leading-[2rem]">/wk</span>
          </div>
          <h3 className="text-[#333f48] text-[0.875rem] font-semibold leading-[1.25rem] m-0 overflow-hidden text-ellipsis whitespace-nowrap">
            Inc. bills
          </h3>
        </a>

        <div className="flex items-center p-1 my-3">
          <div className="mr-6 flex justify-center items-center">
            <div className="inline-block mr-2">
              <span className="align-sub text-center">
                {/* SVG for bedroom */}
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="27" viewBox="0 0 33 27">
                  <g fill="none" fill-rule="evenodd" stroke="#2E3A4A" stroke-linecap="round" stroke-linejoin="round">
                    <path fill="#C9F8EE" d="M6.9 11.17V7.046c0-.838.59-1.46 1.338-1.24.954.28 2.26.468 3.658.05.734-.219 1.437.423 1.437 1.249v4.065M18.633 11.17V7.046c0-.838.59-1.46 1.338-1.24.955.28 2.261.468 3.659.05.734-.219 1.436.423 1.436 1.249v4.065"></path>
                    <path d="M31.467 16.533H.533v-.19c0-2.736 3.114-5.143 6.955-5.143h17.024c3.841 0 6.955 2.407 6.955 5.143v.19zM.533 22.933h30.934v-6.4H.533zM.533 22.933V26M31.467 22.933V26"></path>
                    <path d="M3.733 12.04V.534h24.534v11.508"></path>
                  </g>
                </svg>
              </span>
            </div>
            <div className="text-[#2e3a4b] inline-block text-[1.5rem] leading-[2rem] mb-1">2</div>
          </div>

          <div className="mr-6 flex justify-center items-center">
            <div className="inline-block mr-2">
              <span className="align-sub text-center">
                {/* SVG for bathroom */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <g fill="none" fill-rule="evenodd" stroke="#2E3A4A" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15.304 6.51c0-1.442-1.45-2.936-3.241-2.936-1.791 0-3.242 1.494-3.242 2.935h6.483z"></path>
                    <path d="M12.063 3.574c-.842-.701-2.45-1.041-3.63-1.041a4.854 4.854 0 0 0-4.855 4.854v12.055"></path>
                    <path d="M30.138 19.442v1.248c-.342 4.526-3.7 8.423-8.226 8.423H9.682c-4.526 0-7.883-3.897-8.274-8.423v-1.248M8.162 28.975l-1.047 2.224M23.502 28.975l1.047 2.224M25.942 19.442h4.985M.534 19.442h19.929"></path>
                    <path fill="#C9F8EE" d="M20.463 24.776h5.48v-6.257h-5.48z"></path>
                    <path d="M20.463 22.642h5.479"></path>
                  </g>
                </svg>
              </span>
            </div>
            <div className="text-[#2e3a4b] inline-block text-[1.5rem] leading-[2rem] mb-1">4</div>
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div className="mb-6">
        <h3 className="text-[#2e3a4b] text-[1.125rem] font-semibold leading-[30px] mb-4">
          About the property
        </h3>
        <div className="text-[#6d737e] text-[1rem] leading-[30px] break-words">
          <p>Welcome to our flat, which is ideally situated just a short 5-minute walk from the University of Sydney (USYD) and Glebe Point Road. This prime location ensures easy access to both the bustling</p>
          
          <p>Broadway shopping center and the University of Technology Sydney (UTS), making your daily routines and university commutes incredibly convenient.</p>
          
          <p>Features:</p>
          
          <p>• Spacious Living Area: The flat features a large TV room, complete with a comfortable couch and a smart 50-inch TV. It&apos;s an ideal space for unwinding after a busy day or enjoying movie nights with friends.</p>
          
          <p>• Modern Internal Laundry: The convenience of an internal laundry is at your fingertips, including both a washing machine and a dryer, so you won&apos;t need to worry about trips to the laundromat.</p>
          
          <p>• Flexible Room Furnishings: The room available is currently furnished, but we can accommodate requests for an unfurnished option if that better suits your needs.</p>
          
          <p>• All-Inclusive Pricing: The room prices cover all utility bills, including unlimited NBN internet, and professional cleaning services for the common areas. The cleaning is managed by a professional business, ensuring that the shared spaces are always well-maintained. (provided by a business, Ceje Group P / L that professionally manages the property)</p>
          
          <p>If you&apos;re interested in this flat, please reach out with some information about yourself. We&apos;d be more than happy to answer any questions you might have or arrange a viewing at a time that&apos;s convenient for you. Don&apos;t miss out on this excellent opportunity to live in a well-located and comfortable flat!</p>
          
          <p>We manage numerous listings on Flatmates, so we can show you a few options.</p>
          
          <p>Disclaimer: Pictures used in this ad are for display purposes only and do not reflect the exact appearance of the room available. The room available is similar in appearance and size.</p>
        </div>
      </div>

      {/* Property Accepting Section */}
      <div className="mb-6">
        <h3 className="text-[#333f48] text-[1.125rem] font-semibold leading-[1.5rem] mb-4 my-4">
          Property accepting of
        </h3>
        <a href="">
          <div className="rounded-full border border-[#2f3a4a] inline-block mb-3 ml-0 p-2.5 px-3">
            <div className="block float-left mt-1 leading-[1.5em] mr-2">
              <span className="text-center leading-[1.5em]">
                <svg width="20" height="14">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g transform="translate(-177.000000, -2502.000000)" stroke="#13D0AB" stroke-width="2">
                      <g transform="translate(0.000000, 668.000000)">
                        <polyline points="178 1840.98813 183.414472 1846.181 195.074 1835"></polyline>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </div>
            <div className="block overflow-hidden">
              <span className="text-[#2f3a4a] text-[1rem] leading-[1.375rem] mr-1">Students</span>
            </div>
          </div>
        </a>
      </div>

      {/* Inspection Section */}
      <div className="mb-6 bg-[#f8f8f9] border border-[#e3e4e5] rounded-[12px] p-[2rem] flex flex-col">
        <header>
          <div className="float-left leading-none flex">
            <span className="bg-[#2f3a4a] rounded-full inline-block mr-2 p-1 px-[5px] text-center">
              {/* Calendar SVG */}
              <svg aria-hidden="true" data-prefix="far" data-icon="calendar-alt" viewBox="0 0 448 512" width="18" height="23">
                <path fill="#fff" d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
              </svg>
            </span>
            <h3 className="text-[#2f3a4a] text-[1.125rem] font-semibold leading-[1.5rem] m-0 overflow-hidden">
              Message Jesse to request an inspection
            </h3>
          </div>
        </header>
        <main className="flex items-center mt-4">
          <p className="block mr-8 w-[416px] text-[#2f3a4a] text-[1rem] leading-[1.375rem] my-auto">
            To inspect this room, send a message introducing yourself and ask to see their inspection times.
          </p>
          <button className="flex bg-[#006977] text-[#fff] font-semibold items-center justify-center flex-shrink-0 relative rounded-lg p-3.5 min-h-[3rem] " style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
            Request Inspection
          </button>
        </main>
      </div>
    </section>
  );
};

export default PropertiesContent;