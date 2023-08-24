"use client";

import React, { useCallback, useState } from "react";

import Wrapper from "../shared/Wrapper";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "../shared/Avatar";
import MenuItem from "../shared/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { BiAddToQueue } from "react-icons/bi";
import useBlogModal from "@/app/hooks/useBlogModal";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Header: React.FC<NavbarProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const blogModal = useBlogModal();
  const [isOpen, setIsOpen] = useState(false);

  const writeBlog = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    blogModal.onOpen();
  }, [currentUser, loginModal, blogModal]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
      <Wrapper>
        <header className="flex justify-between pt-6 pb-4 items-center sticky top-0">
          <ul className="font-semibold hover:font-bold lg:flex lg:space-x-10 lg:text-lg lg:font-normal hidden">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
          </ul>
          <div className="text-3xl font-bold">
            <Link href={"/"}>
              <img
                className="w-full h-10 lg:h-16"
                src="/logo-no-background2.svg"
                alt=""
              />
            </Link>
          </div>
          <div>
            <div
              onClick={toggleOpen}
              className="flex flex-row py-2 px-2 cursor-pointer gap-3 border-[2px] items-center rounded-full"
            >
              <GiHamburgerMenu />
              <div>
                <Avatar src={currentUser?.image} />
              </div>
            </div>
            <div
              onClick={writeBlog}
              className="absolute -mx-12 -my-10 -scale-125 items-center flex flex-row bg-slate-200 cursor-pointer transition duration-100 delay-50 ease-in-out hover:bg-slate-400 p-2 rounded-full"
            >
              <BiAddToQueue />
            </div>
          </div>

          {isOpen && (
            <div className="absolute rounded-xl py-2 drop-shadow-md w-[40vw] md:w-1/5 bg-white overflow-hidden right-0 top-16 text-sm">
              <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                  <>
                    <MenuItem onClick={() => {}} label="My Blogs" />
                    <MenuItem onClick={() => {}} label="My Supports" />
                    <hr />
                    <MenuItem onClick={() => signOut()} label="logout" />
                  </>
                ) : (
                  <>
                    <MenuItem onClick={loginModal.onOpen} label="log In" />
                    <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
                  </>
                )}
              </div>
            </div>
          )}
        </header>
      </Wrapper>
    </>
  );
};

export default Header;
