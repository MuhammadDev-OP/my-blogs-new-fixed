"use client";

import React from "react";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";
import { Listing, User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import ClapButton from "../shared/ClapButton";
import { useRouter } from "next/navigation";

interface HeroCardProps {
  data: Listing;
  onAction?: (id: string) => void;
  actionId?: string;
  currentUser?: SafeUser | any;
  nameof: User;
}

const Hero: React.FC<HeroCardProps> = ({
  data,
  onAction,
  actionId,
  currentUser,
  nameof,
}) => {
  const router = useRouter();
  return (
    <>
      <Wrapper>
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex justify-between items-center mb-5 text-gray-500">
            <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
              <svg
                className="mr-1 w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  clip-rule="evenodd"
                ></path>
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
              </svg>
              Article
            </span>
            <ClapButton listingId={data.id} currentUser={currentUser} />
          </div>
          <div className=" aspect-square relative overflow-hidden rounded-xl mb-5">
            <img
              className="object-cover h-full w-full group-hover:scale-110 transition"
              src={data.imageSrc}
              alt="image"
            />
          </div>

          <h2 className="mb-2 cursor-pointer text-2xl font-bold tracking-tight text-gray-900 ">
            <a>{data.title}</a>
          </h2>
          <div className="mb-5 font-light text-gray-500 dark:text-gray-400">
            <p className="truncate w-64">{data.description}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                className="w-7 h-7 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="MuhammadKharkovavatar"
              />
              <span className="font-medium ">{nameof?.name}</span>
            </div>
            <a
              onClick={() => router.push(`/Lisitngs/${data.id}`)}
              className="inline-flex cursor-pointer items-center font-medium text-primary-600 hover:underline"
            >
              Learn More
              <svg
                className="ml-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </article>
      </Wrapper>
    </>
  );
};

export default Hero;
