import { SafeUser } from "@/app/types";
import Avatar from "./Avatar";

interface ListingInfoProps {
  user: SafeUser;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ user }) => {
  return (
    <div
      className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
            mt-1
          "
    >
      <div>Written By {user?.name}</div>
      <Avatar src={user?.image} />
    </div>
  );
};

export default ListingInfo;
