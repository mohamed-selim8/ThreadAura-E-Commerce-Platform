// import components
import Hero from "../components/Hero";
import LatestItems from "../components/LatestItems";
import BestSeller from "../components/BestSeller";
import Policy from "../components/Policy";
import Subscribe from "../components/Subscribe";
function Home() {
  return (
    <div>
      <Hero />

      {/* latest items */}
      <LatestItems />
      {/* best items */}
      <BestSeller />
      {/* policy */}
      <Policy />
      {/* subscribe */}
      <Subscribe />
    </div>
  );
}

export default Home;
