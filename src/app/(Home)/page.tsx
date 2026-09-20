import LandingPage from "./home-component/Landing-page";
import { Event } from "@/app/_types/types";

export default function Home({ props }: { props: Event[] }) {
  return (
    <>
      <LandingPage />
    </>
  );
}
