"use client";

import Image from "next/image";
import Hero from "./components/widgets/Hero";
import ClientOnly from "./components/ClientOnly";
import getListings from "./actions/getListings";
import Wrapper from "./components/shared/Wrapper";

const Home = async () => {
  const listings = await getListings();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <div className="justify-center font-bold mt-10">No Blogs</div>
      </ClientOnly>
    );
  }

  return (
    <>
      <ClientOnly>
        <div>
          {listings.map((listings: any) => {
            return <div>{listings.title}</div>;
          })}
        </div>
        <Hero />
      </ClientOnly>
    </>
  );
};

export default Home;
