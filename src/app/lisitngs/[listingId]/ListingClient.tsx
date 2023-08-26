"use client";

import ListingInfo from "@/app/components/shared/LisitingInfo";
import Wrapper from "@/app/components/shared/Wrapper";
import ListedBlog from "@/app/components/widgets/LisitedBlog";
import { SafeListing, SafeUser } from "@/app/types";
import React from "react";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  return (
    <Wrapper>
      <div className="flex pt-10 flex-col gap-6 mb-4">
        <ListedBlog
          title={listing.title}
          imageSrc={listing.imageSrc}
          id={listing.id}
          description={listing.description}
          currentUser={currentUser}
        />
      </div>
      <hr />
      <ListingInfo user={listing.user} />
    </Wrapper>
  );
};

export default ListingClient;
