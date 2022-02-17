import Head from "next/head";
import { Navbar } from "../component/Navbar/Menu";
import { Hero } from "../component/Hero/Hero";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
};
export default Home;
