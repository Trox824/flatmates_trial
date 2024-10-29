import HeroSection from "~/app/_components/home/HeroSection";
import ListingGrid from "~/app/_components/home/ListingGrid";
import CreateListingButton from "~/app/_components/home/CreateListingButton";

// This would typically come from your API
const mockListings = [
  {
    id: "1",
    imageUrl: "/path/to/image.jpg",
    price: 220,
    name: "Honami",
    age: 31,
    gender: "woman", 
    description: "I'm a Japanese painter. I like art and hope for cultural exchange...",
    availableNow: true,
  },
  {
    id: "2",
    imageUrl: "/path/to/image2.jpg",
    price: 250,
    name: "Sarah",
    age: 25,
    gender: "woman",
    description: "Working professional looking for a friendly houseshare...",
    availableNow: false,
  },
  {
    id: "3",
    imageUrl: "/path/to/image3.jpg",
    price: 280,
    name: "James",
    age: 28,
    gender: "man",
    description: "Student at UWA, clean and tidy, looking for similar housemates...",
    availableNow: true,
  },
  // ... more listings
];

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ListingGrid listings={mockListings} />
      <CreateListingButton isVisible={true} />
    </main>
  );
}
