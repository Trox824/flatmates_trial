import type { FC } from "react";
import Image from "next/image";
import housemate from "../../../../public/images/housemate.png";
import Link from "next/link";

interface BaseListingProps {
  id: string;
  type: "person" | "room";
  heading: string;
  price: number;
}

export interface PersonListingProps extends BaseListingProps {
  type: "person";
  description?: string;
  subheading?: string;
  availableFrom?: Date;
}

export interface RoomListingProps extends BaseListingProps {
  type: "room";
  address?: string;
  secondaryContent?: string;
  availableFrom?: Date;
}

type ListingCardProps = PersonListingProps | RoomListingProps;

const ListingCard: FC<ListingCardProps> = (props) => {
  return (
    <Link href={`/${props.id}`} className="block">
      <div className="bg-white overflow-hidden cursor-pointer transition-shadow duration-200">
        {/* Image Container */}
        <div className="relative aspect-[123/100] w-full">
          <Image
            src={housemate}
            alt={props.heading}
            fill
            className="object-cover rounded-2xl"
          />
          <button className="absolute bottom-3 right-3 p-1.5 rounded-full hover:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 transition-colors duration-200"
              fill="rgba(0,0,0,0.5)"
              viewBox="0 0 24 24"
              stroke="white"
              onMouseEnter={(e) => {
                e.currentTarget.style.fill = "rgba(0,0,0,0.7)";
                e.currentTarget.style.stroke = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.fill = "rgba(0,0,0,0.5)";
                e.currentTarget.style.stroke = "white";
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="pt-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-medium">
              {props.type === "room" ? `$${props.price}/week` : props.heading}
            </h3>
            <button className="text-xs border border-gray-700 rounded py-1 px-3 hover:bg-gray-50">
              Free to message
            </button>
          </div>

          <div className="flex items-center text-sm gap-2 text-gray-600 ">
            {props.type === "room" ? (
              props.address && <span>{props.address}</span>
            ) : (
              props.subheading && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {props.subheading.split('•').map((item, index, array) => (
                    <span key={`subheading-${index}`}>
                      <span className="p-1">{item.trim()}</span>
                      {index < array.length - 1 && (
                        <svg className="w-1 h-1 text-gray-500 inline-block" viewBox="0 0 6 6">
                          <circle cx="3" cy="3" r="3" fill="currentColor" />
                        </svg>
                      )}
                    </span>
                  ))}
                </div>
              )
            )}
          </div>

          {props.type === "person" ? (
            <p className="text-gray-600 text-sm py-1 line-clamp-2">
              {props.description}
            </p>
          ) : (
            <p className="text-gray-600 text-sm py-1 line-clamp-2">
              {props.secondaryContent && (
                <div className="flex items-center gap-2">
                  {props.secondaryContent.split('•').map((item, index, array) => {
                    if (index === 0) {
                      const [beds, baths, people] = item.trim().split('');
                      return (
                        <div key={`metrics-${index}`} className="flex items-center gap-2">
                          {/* Bed icon with number */}
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M15 10H1v-.107C1 8.354 2.41 7 4.148 7h7.704C13.591 7 15 8.354 15 9.893V10zM4 7V5.823C4 5.266 4.325 5 4.798 5c.577 0 .283 0 1.345.033.465.015.857.28.857.83V7H4zm5 0V5.823C9 5.266 9.325 5 9.798 5c.577 0 .283 0 1.345.033.465.015.857.28.857.83V7H9zm-8 6h14v-3H1v3zm1-5.5V2h12v5.5M1 12.078v2m14-2v2" />
                            </svg>
                            <span>{beds}</span>
                          </div>
                          {/* Bath icon with number */}
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M10 6s-.299-2-2.182-2S6 6 6 6h4zM8.042 4c0-2-.847-3-2.542-3C3.833 1 3 2 3 4v5.474M14 10v1.013C14 12.99 12.485 14 10.595 14h-5.14C3.566 14 2 13.029 2 11.013V10m1 3.26L2 15m11-1.74L14 15M1 10h14" />
                            </svg>
                            <span>{baths}</span>
                          </div>
                          {/* People icon with number */}
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M14 6.213V15H2V6.213l.015-.159L8 1l5.981 5.054.019.159z" />
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.003 12.001v-.3s-.075-.226-.185-.268C10.53 10.935 9.1 10.317 8.98 9.93v-.403c.268-.274.478-.655.602-1.102a.655.655 0 00.127-.95v-.904C9.71 5.64 9.19 5 8 5c-1.158 0-1.71.639-1.71 1.572v.905a.656.656 0 00.128.95c.124.446.335.827.602 1.1v.404c-.12.385-1.545 1.004-2.833 1.502a.287.287 0 00-.182.268v.3" />
                            </svg>
                            <span>{people}</span>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <span key={`secondary-${index}`}>
                        <svg className="w-7 h-3 text-gray-500 inline-block" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="2" fill="currentColor" />
                        </svg>
                        <span className="p-1">{item.trim()}</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </p>
          )}

          {props.availableFrom !== undefined && (
            <div className="mt-2">
              <span className="inline-block text-gray-500 text-xs py-1 rounded-full">
                Available {props.availableFrom ? new Date(props.availableFrom).toLocaleDateString() : 'now'}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;