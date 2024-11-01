'use client';

import { api } from "~/trpc/react";
import { Breadcrumb } from "~/app/_components/breadcrumb";
import ImageScroll from "~/app/_components/ImageScroll";
import PropertiesContent from "~/app/_components/propertiesContent/PropertiesContent";
import PropertyAside from "~/app/_components/propertiesContent/PropertyAside";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PersonPage({ params }: PageProps) {
  const { id } = params;
  
  const imagePaths = [
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
  ];
  
  return (
    <div>
      <div className="bg-[#f4f5f5] p-1">
        <div className="block m-auto max-w-[1200px] px-[3%]">
          <div className="flex p- w-full justify-center flex-row gap-5">
            <h4 className="inline-block w-auto text-[#2f3a4a] text-[1rem] font-semibold leading-[2rem] mb-0 align-middle">
              Get started with a FREE listing
            </h4>
            <div className="flex gap-2 justify-center">
              <a className="bg-[#2f3a4a] border border-[#2f3a4a] text-white flex text-center justify-center items-center min-h-[2rem] min-w-[2rem] px-4 py-[0.375rem] rounded-md" href="#">
                <span className="text-[0.875rem] leading-[1.25rem] font-semibold">Find people</span>
              </a>
              <a className="bg-[#2f3a4a] border border-[#2f3a4a] text-white flex text-center justify-center items-center min-h-[2rem] min-w-[2rem] px-4 py-[0.375rem] rounded-md" href="#">
                <span className="text-[0.875rem] leading-[1.25rem] font-semibold">Find homes</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 px-12 max-w-7xl">
      
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Rooms', href: '/rooms' },
          { label: 'Benowa, 4217', href: '/rooms/benowa-4217' },
          { label: 'Granny Flats', href: '/rooms/benowa-4217/granny-flats' },
          { label: 'P1637491' }
        ]}
      />
      <ImageScroll imagePaths={imagePaths} />
      
      <div className="flex gap-8">
        <PropertiesContent />
        <PropertyAside />
        </div>
      </div>
    </div>
    
  );
}
