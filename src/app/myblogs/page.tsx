"use client";

import React from "react";
import Wrapper from "../components/shared/Wrapper";
import getCurrentUser from "../actions/getCurrentUser";
import { error } from "console";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import BlogsClient from "./BlogsClient";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return error;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <div className="font-bold text-3xl mt-10 text-center mx-auto">
          No Properties Found
        </div>
      </ClientOnly>
    );
  }

  return (
    <Wrapper>
      <BlogsClient listings={listings} currentUser={currentUser} />
    </Wrapper>
  );
};

export default page;
