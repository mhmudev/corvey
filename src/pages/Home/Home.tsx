import Features from "../../components/Features/Features";
import Hero from "../../components/Hero/Hero";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import Newsletter from "../../components/Newsletter/Newsletter";
import LastArrivalTitle from "../../components/UI/LastArrivalTitle/LastArrivalTitle";

export default function Home() {
  return (
    <>
      <Hero />
      <LastArrivalTitle />
      <NewArrivals />
      <Newsletter />
      <Features />
    </>
  );
}
