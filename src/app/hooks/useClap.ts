import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseClap {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useClap = ({ listingId, currentUser }: IUseClap) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasClaped = useMemo(() => {
    const list = currentUser?.ClapIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleClap = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasClaped) {
          request = () => axios.delete(`/api/claps/${listingId}`);
        } else {
          request = () => axios.post(`/api/claps/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasClaped, listingId, loginModal, router]
  );

  return {
    hasClaped,
    toggleClap,
  };
};

export default useClap;
