import Image from "next/image";
import Link from "next/link";
import housemate from "../../../../public/images/housemate.png";

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Property Listing Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Create a free<br />property listing
            </h2>
            <Link 
              href="/create-listing"
              className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              I need a flatmate
            </Link>
          </div>
          <div className="relative w-40 h-40">
            <Image
              src={housemate}
              alt="Property illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Seeker Listing Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Create a free<br />seeker listing
            </h2>
            <Link 
              href="/create-seeker"
              className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              I need a place
            </Link>
          </div>
          <div className="relative w-40 h-40">
            <Image
              src={housemate}
              alt="Seeker illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}