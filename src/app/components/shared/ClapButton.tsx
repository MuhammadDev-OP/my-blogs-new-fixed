"use client";

import { PiHandsClappingFill, PiHandsClappingThin } from "react-icons/pi";

import { SafeUser } from "@/app/types";

interface ClapButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const ClapButton: React.FC<ClapButtonProps> = ({ listingId, currentUser }) => {
  //   const { hasFavorited, toggleFavorite } = useClap({
  //     listingId,
  //     currentUser,
  //   });
  const hasClaped = false;

  const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <PiHandsClappingThin
        size={28}
        className="
        top-[20px]
        -right-[4px]
          fill-white
          absolute
        "
      />
      <PiHandsClappingFill
        size={24}
        className={hasClaped ? "fill-green-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default ClapButton;
