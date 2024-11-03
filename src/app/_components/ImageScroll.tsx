import { useState, useRef } from "react";

interface ImageScrollProps {
  imagePaths: string[];
}

export default function ImageScroll({ imagePaths }: ImageScrollProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const scrollRight = () => {
    if (scrollIndex < imagePaths.length - 3) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-4 top-4 z-20 m-3 flex gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-white/95 px-4 text-gray-500">
          <span>Share</span>
          <button className="rounded-full p-1 hover:bg-white/80">
            <img src="/facebook.svg" alt="Facebook" className="h-5 w-5" />
          </button>
          <button className="rounded-full p-1 hover:bg-white/80">
            <img src="/twitter.svg" alt="Twitter" className="h-5 w-5" />
          </button>
          <button className="rounded-full p-1 hover:bg-white/80">
            <img src="/email.svg" alt="Email" className="h-5 w-5" />
          </button>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-gray-500 hover:bg-white/80">
          <img src="/star.svg" alt="Shortlist" className="h-5 w-5" />
          <span>Shortlist</span>
        </button>
      </div>

      <div className="relative">
        {scrollIndex > 0 && (
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white bg-white/90 opacity-80 shadow-2xl drop-shadow-[0_0_3px_rgba(0,0,0,0.6)] transition duration-100 hover:opacity-100"
            style={{ left: "-30px" }}
          >
            &lt;
          </button>
        )}
        <div className="my-4 overflow-hidden rounded-2xl">
          <div
            ref={scrollContainerRef}
            className="flex gap-x-2 transition-transform duration-300"
            style={{ transform: `translateX(-${scrollIndex * (100 / 3)}%)` }}
          >
            {imagePaths.map((path, index) => (
              <div key={index} className="w-1/3 flex-none">
                <img
                  src={path}
                  alt={`Image ${index + 1}`}
                  className="h-[21rem] w-[26rem] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {scrollIndex < imagePaths.length - 3 && (
          <button
            onClick={scrollRight}
            className="absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white bg-white/90 opacity-80 shadow-2xl drop-shadow-[0_0_3px_rgba(0,0,0,0.6)] transition duration-100 hover:opacity-100"
            style={{ right: "-30px" }}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}
