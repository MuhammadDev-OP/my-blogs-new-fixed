"use client";

import { SafeUser } from "@/app/types";
import Heading from "../shared/Heading";
import Image from "next/image";
import ClapButton from "../shared/ClapButton";

interface ListedBlogProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
  description: string;
}

const ListedBlog: React.FC<ListedBlogProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
  description,
}) => {
  return (
    <>
      <Heading title={title} subtitle="InPaged Image" />
      <div
        className="
        w-full
        h-[60vh]
        overflow-hidden 
        rounded-xl
        relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
          absolute
          top-[10px]
          right-[10px]
          "
        >
          <ClapButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
      <div className="text-base leading-6">
        <p className="mb-3">
          <span className="text-3xl font-extrabold leading-none inline-block">
            {description[0]}
          </span>
          {description.slice(1)}
        </p>
      </div>
    </>
  );
};

export default ListedBlog;
