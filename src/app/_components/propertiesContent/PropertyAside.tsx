const PropertyAside = () => {
  return (
    <aside className="w-[32%]">
      {/* Message Section */}
      <span id="contact"></span>
      <div className="mb-6 p-6 bg-[#f8f8f9] border border-[#e3e4e5] rounded-[12px] relative text-center">
        <div className="flex items-center justify-center mb-4 text-center">
          <div className="mr-6 h-[88px] relative w-[88px]">
            <div className="person-dropzone img-container">
              <img 
                className="border-2 border-white h-[88px] w-[88px] rounded-full"
                src="https://flatmates-res.cloudinary.com/image/upload/c_fill,dpr_2.0,f_auto,g_faces,h_132,q_auto,w_132/v1/user_profile/jrd0drlon4x4tokpdcew"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="text-[#2e3a4b] text-[18px] font-semibold">Message Handy</div>
            <div className="text-[#6d7580] text-[0.75rem]">Online Today</div>
            <div className="bg-[#eaebec] rounded-[14.5px] text-[#2f3a4a] inline-block text-[0.875rem] mt-2.5 p-1 px-3">
              <div>
                Response rate: 
                <span>100%</span>
                <button type="button" aria-label="More information" className="border-none outline-none bg-transparent cursor-pointer m-0 p-1">
                  <i className="fas fa-question-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <section>
          <form method="post" action="/conversations/create">
            <input type="hidden" id="listing" name="listing" value="PROPERTY" />
            <input type="hidden" id="listing_id" name="listing_id" value="1629246" />
            <input type="hidden" id="member_id" name="member_id" value="" />
            <textarea 
              className="border border-[#abb0b6] rounded-[8px] text-[1rem] min-h-[110px] p-3 px-4 w-full"
              name="message"
              placeholder="Type your message…"
              aria-label="Message area"
              maxLength={256}
            />
            <p className="text-sm text-gray-600">0/256 characters</p>
            <div>
              <button 
                type="submit"
                className="border mb-2 mt-6 w-full block mx-auto min-w-[190px] transition duration-250 text-[1rem] leading-[1.5rem] font-semibold relative rounded-md p-3 px-6 min-h-[3rem] bg-[#006977] text-[#fff]"
              >
                Send message
              </button>
            </div>
          </form>
        </section>

        <div>
          <button 
            type="button"
            className="w-full mt-4 p-3 border rounded-md text-[1rem] font-semibold"
          >
            Login to show Handynumber
          </button>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mb-6 border border-[#eaebec] rounded-[12px] p-[1.5rem] pt-[2rem] text-center">
        <h3 className="text-[#333f48] text-[1rem] font-semibold leading-[1.5rem] m-0">
          Handy has no verified social media
        </h3>
        <div className="h-[42px] my-3.5 flex items-center justify-center">
          {/* Social media icons here */}
        </div>
      </div>

      {/* Report Button */}
      <div>
        <button type="button" className="w-full flex items-center justify-center p-3 border rounded-md mb-6">
          <span className="mr-2">
            <svg className="warning-shield" viewBox="0 0 50 50" width="20" height="20">
              {/* SVG path here */}
            </svg>
          </span>
          <span>Report this property</span>
        </button>
      </div>

      {/* Tips Section */}
      <div className="border border-[#eaebec] rounded-[12px] p-[1.5rem]">
        <h3 className="text-[#333f48] text-[1rem] font-semibold mb-4">Tips for securing this room</h3>
        <ul className="list-none p-0">
          <li className="mb-2">
            <a href="/info/why-a-viewing-is-important" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Why a viewing is important
            </a>
          </li>
          <li className="mb-2">
            <a href="/info/why-you-should-use-the-message-system" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Why you should use the messaging system
            </a>
          </li>
          <li className="mb-2">
            <a href="/info/find-share-accommodation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Tips for finding accommodation
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default PropertyAside;