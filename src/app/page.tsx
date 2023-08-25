import Image from "next/image";
import Hero from "./components/widgets/Hero";
import ClientOnly from "./components/ClientOnly";
import getListings from "./actions/getListings";
import Wrapper from "./components/shared/Wrapper";
import { Container } from "postcss";
import getCurrentUser from "./actions/getCurrentUser";

const Home = async () => {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  return (
    <>
      <ClientOnly>
        <div>
          {listings.map((listing: any) => {
            return (
              <Hero currentUser={currentUser} key={listing.id} data={listing} />
            );
          })}
        </div>
      </ClientOnly>
    </>
  );
};

export default Home;
