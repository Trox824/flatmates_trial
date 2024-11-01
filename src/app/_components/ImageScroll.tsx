import { useState, useRef } from 'react';

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
      <div className="absolute right-4 top-4 z-20 flex gap-4 m-3">
        <div className="flex  text-gray-500 items-center gap-2 bg-white/95 rounded-lg px-4">
          <span>Share</span>
          <button className="p-1 hover:bg-white/80 rounded-full">
            <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-white/80 rounded-full">
            <img src="/twitter.svg" alt="Twitter" className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-white/80 rounded-full">
            <img src="/email.svg" alt="Email" className="w-5 h-5" />
          </button>
        </div>
        <button className="flex  text-gray-500 items-center gap-2 px-4 py-2 rounded-lg bg-white/95 hover:bg-white/80">
          <img src="/star.svg" alt="Shortlist" className="w-5 h-5" />
          <span>Shortlist</span>
        </button>
      </div>

      <div className="relative">
        {scrollIndex > 0 && (
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 -translate-y-1/2 bg-white/90 shadow-2xl z-10 w-14 h-14 flex items-center justify-center rounded-full hover:opacity-100 bg-white drop-shadow-[0_0_3px_rgba(0,0,0,0.6)] justify-center opacity-80 transition duration-100"
            style={{ left: '-30px' }}
          >
            &lt;
          </button>
        )}
        <div className="overflow-hidden rounded-2xl my-4">
          <div
            ref={scrollContainerRef}
            className="flex transition-transform duration-300 gap-x-2"
            style={{ transform: `translateX(-${scrollIndex * (100 / 3)}%)` }}
          >
            {imagePaths.map((path, index) => (
              <div key={index} className="flex-none w-1/3">
                <img
                  src={path}
                  alt={`Image ${index + 1}`}
                  className="h-80 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {scrollIndex < imagePaths.length - 3 && (
          <button
            onClick={scrollRight}
            className="absolute top-1/2 -translate-y-1/2 bg-white/90 shadow-2xl z-10 w-14 h-14 flex items-center justify-center rounded-full hover:opacity-100 bg-white drop-shadow-[0_0_3px_rgba(0,0,0,0.6)] justify-center opacity-80 transition duration-100"
            style={{ right: '-30px' }}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}