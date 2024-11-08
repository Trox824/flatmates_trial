import { useState, useRef } from "react";
import Image from "next/image";

interface ImageScrollProps {
  imagePaths: string[];
}

export default function ImageScroll({ imagePaths }: ImageScrollProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // If imagePaths is empty, return skeleton image with buttons
  if (!imagePaths.length) {
    return (
      <div className="relative">
        <div className="absolute right-4 top-4 z-20 m-3 flex gap-4">
          <div className="font-base flex items-center gap-2 rounded-lg bg-white/95 px-4 text-gray-500">
            <span>Share</span>
            <button className="rounded-full p-1 hover:bg-white/80">
              <svg
                className="facebook h-4 w-4 text-gray-900"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#52525b"
                  d="M11.027 15.967v-6.17h2.07l.31-2.405h-2.38V5.856c0-.696.193-1.17 1.192-1.17h1.272V2.533c-.22-.03-.976-.094-1.855-.094-1.836 0-3.093 1.12-3.093 3.178v1.774H6.467v2.405h2.077v6.17h2.483"
                ></path>
              </svg>
            </button>
            <button className="rounded-full p-1 hover:bg-white/80">
              <svg className="twitter h-4 w-4" viewBox="0 0 16 13">
                <path
                  fill="#52525b"
                  d="M15.964 1.536c-.587.26-1.218.436-1.88.516.675-.406 1.195-1.048 1.44-1.813-.633.375-1.334.647-2.08.794C12.845.398 11.993 0 11.053 0c-1.81 0-3.277 1.466-3.277 3.275 0 .257.03.507.085.747C5.14 3.885 2.727 2.582 1.112.6.828 1.082.667 1.645.667 2.245c0 1.136.578 2.14 1.457 2.726-.537-.017-1.042-.164-1.484-.41v.042c0 1.587 1.13 2.91 2.628 3.21-.274.076-.564.116-.862.116-.21 0-.417-.02-.617-.06.416 1.303 1.626 2.25 3.06 2.276-1.122.88-2.534 1.402-4.07 1.402-.263 0-.524-.015-.78-.046 1.45.93 3.17 1.472 5.02 1.472 6.025 0 9.32-4.99 9.32-9.32 0-.14-.004-.282-.01-.423.64-.46 1.195-1.037 1.634-1.694"
                ></path>
              </svg>
            </button>
            <button className="rounded-full p-1 hover:bg-white/80">
              <svg className="message-icon h-4 w-4" viewBox="0 0 50 50">
                <g>
                  <path fill="none" d="M0 0h50v50H0z"></path>
                  <path
                    fill="#52525b"
                    d="M50 12.436L34.885 25.59 50 37.487v-25.05zM21.666 28.642C23.072 29.867 24.466 30 25 30s1.928-.133 3.334-1.358C29.752 27.406 48.046 11.487 50 9.786V7H0v2.78c3.012 2.623 20.3 17.67 21.666 18.862z"
                  ></path>
                  <path
                    fill="#52525b"
                    d="M33.35 26.928l-3.702 3.222C27.73 31.82 25.758 32 25 32s-2.73-.18-4.648-1.85c-.35-.307-1.76-1.534-3.7-3.224L0 40.076V43h50v-2.97L33.35 26.93zM15.115 25.59L0 12.43v25.095L15.115 25.59z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <button className="font-base flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-gray-500 hover:bg-white/80">
            <svg className="star h-5 w-5" viewBox="0 0 64 61">
              <path
                className="fill-transparent stroke-gray-500"
                d="M63.922 23.13c-.195-.602-.726-1.03-1.354-1.095l-20.652-2.18L33.458.864c-.512-1.154-2.407-1.154-2.92 0l-8.454 18.99-20.652 2.18C.804 22.1.275 22.53.078 23.13c-.194.6-.02 1.26.45 1.684l15.43 13.918-4.31 20.336c-.13.62.112 1.256.624 1.627.28.203.608.305.938.305.276 0 .552-.07.8-.215L32 50.398l17.992 10.387c.544.315 1.226.278 1.738-.092.51-.37.756-1.008.625-1.625l-4.31-20.338 15.43-13.918c.466-.422.64-1.08.447-1.68z"
                strokeWidth="2"
              ></path>
            </svg>
            <span>Shortlist</span>
          </button>
        </div>
        <div className="my-4 overflow-hidden">
          <Image
            src="/images/skeleton.png"
            alt="Property placeholder"
            width={800}
            height={336}
            className="h-[21rem] w-full object-cover"
          />
        </div>
      </div>
    );
  }

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
            <svg className="facebook h-5 w-5" viewBox="0 0 16 16">
              <path
                fill="#52525b"
                d="M11.027 15.967v-6.17h2.07l.31-2.405h-2.38V5.856c0-.696.193-1.17 1.192-1.17h1.272V2.533c-.22-.03-.976-.094-1.855-.094-1.836 0-3.093 1.12-3.093 3.178v1.774H6.467v2.405h2.077v6.17h2.483"
              ></path>
            </svg>
          </button>
          <button className="rounded-full p-1 hover:bg-white/80">
            <svg className="twitter h-5 w-5" viewBox="0 0 16 13">
              <path
                fill="#52525b"
                d="M15.964 1.536c-.587.26-1.218.436-1.88.516.675-.406 1.195-1.048 1.44-1.813-.633.375-1.334.647-2.08.794C12.845.398 11.993 0 11.053 0c-1.81 0-3.277 1.466-3.277 3.275 0 .257.03.507.085.747C5.14 3.885 2.727 2.582 1.112.6.828 1.082.667 1.645.667 2.245c0 1.136.578 2.14 1.457 2.726-.537-.017-1.042-.164-1.484-.41v.042c0 1.587 1.13 2.91 2.628 3.21-.274.076-.564.116-.862.116-.21 0-.417-.02-.617-.06.416 1.303 1.626 2.25 3.06 2.276-1.122.88-2.534 1.402-4.07 1.402-.263 0-.524-.015-.78-.046 1.45.93 3.17 1.472 5.02 1.472 6.025 0 9.32-4.99 9.32-9.32 0-.14-.004-.282-.01-.423.64-.46 1.195-1.037 1.634-1.694"
              ></path>
            </svg>
          </button>
          <button className="rounded-full p-1 hover:bg-white/80">
            <svg className="message-icon h-5 w-5" viewBox="0 0 50 50">
              <g>
                <path fill="none" d="M0 0h50v50H0z"></path>
                <path
                  fill="#52525b"
                  d="M50 12.436L34.885 25.59 50 37.487v-25.05zM21.666 28.642C23.072 29.867 24.466 30 25 30s1.928-.133 3.334-1.358C29.752 27.406 48.046 11.487 50 9.786V7H0v2.78c3.012 2.623 20.3 17.67 21.666 18.862z"
                ></path>
                <path
                  fill="#52525b"
                  d="M33.35 26.928l-3.702 3.222C27.73 31.82 25.758 32 25 32s-2.73-.18-4.648-1.85c-.35-.307-1.76-1.534-3.7-3.224L0 40.076V43h50v-2.97L33.35 26.93zM15.115 25.59L0 12.43v25.095L15.115 25.59z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-gray-500 hover:bg-white/80">
          <svg className="star h-5 w-5" viewBox="0 0 64 61">
            <path
              className="fill-transparent stroke-gray-500"
              d="M63.922 23.13c-.195-.602-.726-1.03-1.354-1.095l-20.652-2.18L33.458.864c-.512-1.154-2.407-1.154-2.92 0l-8.454 18.99-20.652 2.18C.804 22.1.275 22.53.078 23.13c-.194.6-.02 1.26.45 1.684l15.43 13.918-4.31 20.336c-.13.62.112 1.256.624 1.627.28.203.608.305.938.305.276 0 .552-.07.8-.215L32 50.398l17.992 10.387c.544.315 1.226.278 1.738-.092.51-.37.756-1.008.625-1.625l-4.31-20.338 15.43-13.918c.466-.422.64-1.08.447-1.68z"
              strokeWidth="2"
            ></path>
          </svg>
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
                <Image
                  src={path}
                  alt={`Image ${index + 1}`}
                  width={416}
                  height={336}
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
