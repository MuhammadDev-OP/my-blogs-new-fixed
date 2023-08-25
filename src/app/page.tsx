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
        <div className="mx-auto mt-10 max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 ">
            Sample Blogs
          </h2>
          <p className="font-light text-gray-500 sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            sapiente ipsam a laudantium reiciendis.
          </p>
        </div>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-5 lg:px-2">
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 ">
            {listings.map((listing: any) => {
              return (
                <Hero
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                  nameof={listing.name}
                />
              );
            })}
          </div>
        </div>
      </ClientOnly>
    </>
  );
};

export default Home;
