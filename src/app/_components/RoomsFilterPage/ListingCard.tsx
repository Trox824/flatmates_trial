import { FC, useState, useEffect } from "react";
import Image from "next/image";
import housemate from "../../../../public/images/housemate.png";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface BaseListingProps {
  id: string;
  type: "room";
  heading: string;
  weeklyRent: number;
  billsIncluded?: boolean;
  images?: string[];
  noBeds: number;
  noBathrooms: number;
  noFlatmates: number;
  address?: string;
  availableFrom?: Date;
  location?: string;
  createdAt?: Date;
  lastActive?: Date;
}

interface ListingCardProps extends BaseListingProps {
  isShortlist?: boolean;
  secondaryContent?: string;
}

interface FavoritesResponse {
  favorites: Array<{ id: string }>;
}

const ListingCard: FC<ListingCardProps> = (props) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Normalize image paths
  const images = props.images
    ? props.images.map((img) => {
        if (typeof img === "string") {
          if (!img.startsWith("http") && !img.startsWith("/")) {
            return "/" + img;
          }
          return img;
        }
        return img;
      })
    : [housemate, housemate]; // Default images

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    if (session?.user?.email) {
      const fetchFavorites = async () => {
        try {
          const res = await fetch("/api/favorites");
          if (res.ok) {
            const data = (await res.json()) as FavoritesResponse;
            const favoriteIds = data.favorites.map((listing) => listing.id);
            setIsFavorite(favoriteIds.includes(props.id));
          } else {
            console.error("Failed to fetch favorites");
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };

      void fetchFavorites();
    }
  }, [session, props.id]);

  // Function to toggle favorite status
  const toggleFavorite = async () => {
    if (!session?.user?.email) {
      alert("You need to be logged in to favorite listings.");
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const res = await fetch("/api/favorites/remove", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listingId: props.id }),
        });
        if (res.ok) {
          setIsFavorite(false);
        } else {
          const errorData = (await res.json()) as { message: string };
          alert(errorData.message || "Failed to remove favorite");
        }
      } else {
        // Add to favorites
        const res = await fetch("/api/favorites/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listingId: props.id }),
        });
        if (res.ok) {
          setIsFavorite(true);
        } else {
          const errorData = (await res.json()) as { message: string };
          alert(errorData.message || "Failed to add favorite");
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("An error occurred while updating favorites.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/${props.id}`} className="block">
      <div className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-xl duration-200">
        {/* Image Container with Sliding Logic */}
        <div className="group relative aspect-[16/9] w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.map((imgSrc, index) => (
              <div key={index} className="relative w-full flex-shrink-0">
                <Image
                  src={imgSrc}
                  alt={props.heading}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              {/* Previous button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  prevImage();
                }}
                className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 transition-opacity duration-200 hover:bg-gray-100 ${
                  images.length === 1 || currentImageIndex === 0
                    ? "hidden"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                disabled={images.length <= 1 || currentImageIndex === 0}
              >
                <svg
                  className="h-10 w-10 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextImage();
                }}
                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 transition-opacity duration-200 hover:bg-gray-100 ${
                  images.length === 1 || currentImageIndex === images.length - 1
                    ? "hidden"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                disabled={
                  images.length <= 1 || currentImageIndex === images.length - 1
                }
              >
                <svg
                  className="h-10 w-10 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image count indicator */}
          <div className="absolute right-2 top-2 rounded-xl bg-gray-500 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-90">
            {currentImageIndex + 1}/{images.length}
          </div>

          {/* Favorite Button */}
          <button
            className={`absolute bottom-3 right-3 rounded-full p-1.5 ${
              isFavorite
                ? "hover:bg-black hover:opacity-50"
                : "hover:bg-white hover:opacity-90"
            }`}
            onClick={(e) => {
              e.preventDefault();
              void toggleFavorite();
            }}
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 transition-colors duration-200"
              fill={isFavorite ? "white" : "rgba(0,0,0,0.5)"}
              stroke={"white"}
              viewBox="0 0 24 24"
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
        <div className="px-6 py-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-[1.25rem] font-semibold">
              {props.weeklyRent
                ? `$${props.weeklyRent}/week`
                : "Price not available"}
              {props.billsIncluded && <span className=""> inc. bills</span>}
            </h3>
            <button className="rounded border border-gray-700 px-3 text-xs hover:bg-gray-50">
              Free to message
            </button>
          </div>

          <div className="flex items-center gap-2 text-[1rem] text-gray-600">
            {props.address && <span>{props.address}</span>}
          </div>

          {props.secondaryContent && (
            <p className="line-clamp-2 py-1 text-sm text-gray-600">
              {props.secondaryContent && (
                <div className="flex items-center gap-2">
                  {props.secondaryContent
                    .split("•")
                    .map((item, index, _array) => {
                      if (index === 0) {
                        const [beds, baths, people] = item.trim().split("");
                        return (
                          <div
                            key={`metrics-${index}`}
                            className="flex items-center gap-2"
                          >
                            {/* Bed icon with number */}
                            <div className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 10H1v-.107C1 8.354 2.41 7 4.148 7h7.704C13.591 7 15 8.354 15 9.893V10zM4 7V5.823C4 5.266 4.325 5 4.798 5c.577 0 .283 0 1.345.033.465.015.857.28.857.83V7H4zm5 0V5.823C9 5.266 9.325 5 9.798 5c.577 0 .283 0 1.345.033.465.015.857.28.857.83V7H9zm-8 6h14v-3H1v3zm1-5.5V2h12v5.5M1 12.078v2m14-2v2"
                                />
                              </svg>
                              <span>{beds}</span>
                            </div>
                            {/* Bath icon with number */}
                            <div className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10 6s-.299-2-2.182-2S6 6 6 6h4zM8.042 4c0-2-.847-3-2.542-3C3.833 1 3 2 3 4v5.474M14 10v1.013C14 12.99 12.485 14 10.595 14h-5.14C3.566 14 2 13.029 2 11.013V10m1 3.26L2 15m11-1.74L14 15M1 10h14"
                                />
                              </svg>
                              <span>{baths}</span>
                            </div>
                            {/* People icon with number */}
                            <div className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14 6.213V15H2V6.213l.015-.159L8 1l5.981 5.054.019.159z"
                                />
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12.003 12.001v-.3s-.075-.226-.185-.268C10.53 10.935 9.1 10.317 8.98 9.93v-.403c.268-.274.478-.655.602-1.102a.655.655 0 00.127-.95v-.904C9.71 5.64 9.19 5 8 5c-1.158 0-1.71.639-1.71 1.572v.905a.656.656 0 00.128.95c.124.446.335.827.602 1.1v.404c-.12.385-1.545 1.004-2.833 1.502a.287.287 0 00-.182.268v.3"
                                />
                              </svg>
                              <span>{people}</span>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <span key={`secondary-${index}`}>
                          <svg
                            className="inline-block h-3 w-7 text-gray-500"
                            viewBox="0 0 8 8"
                          >
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
              <span className="inline-block rounded-full py-1 text-xs text-gray-500">
                Available{" "}
                {props.availableFrom
                  ? new Date(props.availableFrom).toLocaleDateString()
                  : "now"}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
