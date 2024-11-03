import Link from "next/link";
import flatmate from "../../../../public/images/flatmate.png";
import seeker from "../../../../public/images/seeker.png";

export default function HeroSection() {
  return (
    <div className="flex flex-row space-between my-8 mx-auto max-w-[1200px]">
      {/* Property Listing Card */}
      <Link href="/create-listing" className="w-full mx-auto mr-8">
        <div 
          className="group border-[2px] hover:border-black border-transparent rounded-[12px] shadow-[0_3px_8px_rgba(0,0,0,0.12),_0_3px_1px_rgba(0,0,0,0.04)] m-1 p-6"
          style={{
            backgroundImage: `url(${flatmate.src})`,
            backgroundPosition: 'right -2px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
          }}
        >
          <div className="flex flex-col items-start justify-center h-[168px] z-20">
            <h3 className="text-[#2f3a4a] text-[1.5rem] font-bold leading-[1.875rem] mb-2 max-w-[230px]">
              Create a free property listing
            </h3>
            <p className="text-[#2f3a4a] text-base leading-6 mb-6 max-w-[230px]">
            </p>
            <div className="bg-[#2f3a4a] group-hover:bg-[#44556d] border-0 rounded-[10px] box-border text-center inline-block font-semibold w-[200px] px-4 py-3">
              <p className="text-white font-semibold m-0 text-[1rem]">
                I need a flatmate
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Seeker Listing Card */}
      <Link href="/create-seeker" className="w-full mx-auto">
        <div 
          className="group border-[2px] hover:border-black border-transparent rounded-[12px] shadow-[0_3px_8px_rgba(0,0,0,0.12),_0_3px_1px_rgba(0,0,0,0.04)] m-1 p-6"
          style={{
            backgroundImage: `url(${seeker.src})`,
            backgroundPosition: 'right -2px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
          }}
        >
          <div className="flex flex-col items-start justify-center h-[168px] z-20">
            <h3 className="text-[#2f3a4a] text-[1.5rem] font-bold leading-[1.875rem] mb-2 max-w-[230px]">
              Create a free seeker listing
            </h3>
            <p className="text-[#2f3a4a] text-base leading-6 mb-6 max-w-[230px]">
            </p>
            <div className="bg-[#2f3a4a] group-hover:bg-[#44556d] border-0 rounded-[10px] box-border text-center inline-block font-semibold w-[200px] px-4 py-3">
              <p className="text-white font-semibold m-0 text-[1rem]">
                I need a place
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

