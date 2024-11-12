import Link from "next/link";
import flatmate from "../../../../public/images/flatmate.png";
import seeker from "../../../../public/images/seeker.png";

export default function HeroSection() {
  return (
    <div className="space-between mx-auto my-8 flex max-w-[1200px] flex-col bg-gray-200 md:flex-row md:bg-transparent">
      {/* Property Listing Card */}
      <Link href="/create-listing" className="mx-auto mr-8 w-full">
        <div
          className="group m-1 rounded-[12px] border-[2px] border-transparent bg-white p-6 shadow-[0_3px_8px_rgba(0,0,0,0.12),_0_3px_1px_rgba(0,0,0,0.04)] hover:border-black"
          style={{
            backgroundImage: `url(${flatmate.src})`,
            backgroundPosition: "right -2px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <div className="z-20 flex h-[60px] flex-col items-start justify-center md:h-[168px]">
            <h3 className="mb-2 max-w-[230px] text-[1rem] font-bold leading-[1.875rem] text-[#2f3a4a] md:text-[1.5rem]">
              Create a free property listing
            </h3>
            <p className="mb-6 max-w-[230px] text-base leading-6 text-[#2f3a4a]"></p>
            <div className="box-border inline-block hidden w-[200px] rounded-[10px] border-0 bg-[#2f3a4a] px-4 py-3 text-center font-semibold group-hover:bg-[#44556d] md:inline">
              <p className="m-0 text-[1rem] font-semibold text-white">
                I need a flatmate
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Seeker Listing Card */}
      <Link href="/create-seeker" className="mx-auto w-full">
        <div
          className="group m-1 rounded-[12px] border-[2px] border-transparent bg-white p-6 shadow-[0_3px_8px_rgba(0,0,0,0.12),_0_3px_1px_rgba(0,0,0,0.04)] hover:border-black"
          style={{
            backgroundImage: `url(${seeker.src})`,
            backgroundPosition: "right -2px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <div className="z-20 flex h-[60px] flex-col items-start justify-center md:h-[168px]">
            <h3 className="mb-2 max-w-[230px] text-[1rem] font-bold leading-[1.875rem] text-[#2f3a4a] md:text-[1.5rem]">
              Create a free seeker listing
            </h3>
            <p className="mb-6 max-w-[230px] text-base leading-6 text-[#2f3a4a]"></p>
            <div className="box-border inline-block hidden w-[200px] rounded-[10px] border-0 bg-[#2f3a4a] px-4 py-3 text-center font-semibold group-hover:bg-[#44556d] md:inline">
              <p className="m-0 text-[1rem] font-semibold text-white">
                I need a place
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
