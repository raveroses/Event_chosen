import EventListingLandingPage from "./component/eventListingLandingPage";
const createPage = () => {
  return (
    <section className="md:w-[70%] w-full h-full md:ml-[250px] md:mt-[80px] mx-[20px] mt-[50px] relative">
      <EventListingLandingPage />
    </section>
  );
};

export default createPage;
