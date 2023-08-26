"use client";

import { PiHandsClappingFill, PiHandsClappingThin } from "react-icons/pi";

import { SafeUser } from "@/app/types";
import useClap from "@/app/hooks/useClap";

interface ClapButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const ClapButton: React.FC<ClapButtonProps> = ({ listingId, currentUser }) => {
  const { hasClaped, toggleClap } = useClap({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleClap}
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
