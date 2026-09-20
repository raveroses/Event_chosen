import HeroSection from "./home-component/HeroSection";
import { Event } from "@/app/_types/types";
import LocationSearching from "./home-component/location-searching";

export default function Home({ props }: { props: Event[] }) {
  return (
    <div className="md:px-60">
      <HeroSection />
      <LocationSearching />
    </div>
  );
}
