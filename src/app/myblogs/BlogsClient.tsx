"use client";

import React from "react";
import { SafeListing, SafeUser } from "../types";
import Wrapper from "../components/shared/Wrapper";
import Heading from "../components/shared/Heading";
import Hero from "../components/widgets/Hero";

interface BlogsClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const BlogsClient: React.FC<BlogsClientProps> = ({ listings, currentUser }) => {
  return (
    <Wrapper>
      <Heading title="Blogs" subtitle="List of Your Properties" />
      <div
        className="
          pt-16
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <Hero
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            user={listing.name}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default BlogsClient;
