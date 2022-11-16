import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div>
      <Navbar />
      {!user?.isSeller && <>
        <Slider />
        <Categories />
      </>
      }
        <Products />
        <Footer />
    </div>
  );
};

export default Home;
