import { useState } from "react";

interface PropertyAsideProps {
  author: string;
  online: string;
  responseRate: string;
  authorAvatar: string | null;
}

const PropertyAside = ({
  author,
  online,
  responseRate,
  authorAvatar,
}: PropertyAsideProps) => {
  const [message, setMessage] = useState("");

  // author now holds the author name directly
  return (
    <aside className="hidden w-[32%] pt-7 lg:block">
      <span id="contact"></span>
      <div className="relative mb-5 rounded-[12px] border border-[#e3e4e5] bg-[#f8f8f9] p-6 text-center">
        <div className="mb-4 flex items-center justify-center text-center">
          <div className="relative mr-6 h-[88px] w-[88px]">
            <div className="person-dropzone img-container">
              <img
                className="h-[88px] w-[88px] rounded-full border-2 border-white"
                src={
                  authorAvatar ??
                  "https://flatmates-res.cloudinary.com/image/asset/c_fill,f_auto,g_center,h_132,q_auto,w_132/person-443bab81a0cbdee404cdd629831ccd89.png"
                }
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-[#2e3a4b]">
              {author}
            </div>
            <div className="text-[0.75rem] text-[#6d7580]">{online}</div>
            <div className="mt-2.5 inline-block rounded-[14.5px] bg-[#eaebec] p-1 px-3 text-[0.875rem] text-[#2f3a4a]">
              <div>
                Response rate:
                <span>{responseRate}</span>
                <button
                  type="button"
                  aria-label="More information"
                  className="m-0 cursor-pointer border-none bg-transparent p-1 outline-none"
                >
                  <i className="fas fa-question-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <section>
          <form method="post" action="/conversations/create">
            <input type="hidden" id="listing" name="listing" value="PROPERTY" />
            <input
              type="hidden"
              id="listing_id"
              name="listing_id"
              value="1629246"
            />
            <input type="hidden" id="member_id" name="member_id" value="" />
            <textarea
              className="min-h-[110px] w-full rounded-[8px] border border-[#abb0b6] p-3 px-4 text-[1rem]"
              name="message"
              placeholder="Type your message…"
              aria-label="Message area"
              maxLength={256}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="text-left text-sm text-gray-600">
              {message.length}/256 characters
            </p>
            <div>
              <button
                type="submit"
                className="duration-250 relative mx-auto mb-2 mt-4 block min-h-[3rem] w-full min-w-[190px] rounded-md border bg-[#006977] p-3 px-6 text-[1rem] font-semibold leading-[1.5rem] text-[#fff] transition"
              >
                Send message
              </button>
            </div>
          </form>
        </section>

        <div>
          <button
            type="button"
            className="w-full rounded-md border border-black bg-white p-3 text-[1rem] font-medium text-gray-700"
          >
            Login to show {author ? author.replace("Message ", "") : "unknown"}{" "}
            number
          </button>
        </div>
      </div>

      <div className="mb-2 rounded-[12px] border border-[#eaebec] p-[1.5rem] pt-[2rem] text-center">
        <h3 className="m-0 text-[16px] font-medium text-[#333f48]">
          {author ? author.replace("Message ", "") : "unknown"} has no verified
          social media
        </h3>
        <div className="my-3.5 flex h-[42px] items-center justify-center">
          {/* Social media icons here */}
        </div>
      </div>

      <div>
        <button
          type="button"
          className="mb-4 flex w-full items-center justify-center rounded-md p-3 text-[15px] font-light text-gray-500"
        >
          <span className="mr-2">
            <svg
              className="warning-shield"
              viewBox="0 0 50 50"
              width="20"
              height="20"
            >
              {/* SVG path here */}
            </svg>
          </span>
          <span>Report this property</span>
        </button>
      </div>

      <div className="rounded-[12px]">
        <h3 className="font-base mb-4 text-[17px] text-[#333f48] text-gray-500">
          Tips for securing this room
        </h3>
        <ul className="list-none p-0">
          <li className="mb-4">
            <a
              href="/info/why-a-viewing-is-important"
              target="_blank"
              rel="noopener noreferrer"
              className="my-5 text-base font-light text-gray-500 underline hover:underline"
            >
              Why a viewing is important
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/info/why-you-should-use-the-message-system"
              target="_blank"
              rel="noopener noreferrer"
              className="my-5 text-base font-light text-gray-500 underline hover:underline"
            >
              Why you should use the messaging system
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/info/find-share-accommodation"
              target="_blank"
              rel="noopener noreferrer"
              className="my-5 text-base font-light text-gray-500 underline hover:underline"
            >
              Tips for finding accommodation
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default PropertyAside;
