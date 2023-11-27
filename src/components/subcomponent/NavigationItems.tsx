// react, next
import { useState, FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// icons
import { ImDrive } from "react-icons/im";
import { MdDevices } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { BiTimeFive } from "react-icons/bi";
import { RiSpam2Line } from "react-icons/ri";
import { AiOutlineCloud, AiOutlineStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

interface ListItem {
   icon: React.ReactNode;
   text: string;
   onClick?: () => void;
}

const NavigationList: FC<{ setToggle: () => void }> = ({ setToggle }) => {
   const itemsSlug: Array<string> = [
      "my-drive",
      "computers",
      "shared-with-me",
      "recent",
      "starred",
      "spam",
      "trash",
      "storage",
   ];
   // Default item array
   const defaultItems: ListItem[] = [
      { icon: <ImDrive className="mr-3 text-xl mt-[1px]" />, text: "My Drive" },
      {
         icon: <MdDevices className="mr-3 text-xl mt-[1px]" />,
         text: "Computers",
      },
      {
         icon: <FaUserGroup className="mr-3 text-xl mt-[1px]" />,
         text: "Shared with me",
      },
      {
         icon: <BiTimeFive className="mr-3 text-xl mt-[1px]" />,
         text: "Recent",
      },
      {
         icon: <AiOutlineStar className="mr-2 text-xl mt-[1px]" />,
         text: "Starred",
      },
      { icon: <RiSpam2Line className="mr-2 text-xl mt-[1px]" />, text: "Spam" },
      { icon: <BsTrash className="mr-2 text-xl mt-[1px]" />, text: "Trash" },
      {
         icon: <AiOutlineCloud className="mr-2 text-xl mt-[1px]" />,
         text: "Storage",
      },
   ];

   const router = useRouter();
   const searchParams = useSearchParams();
   // Link highlighting
   const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
   const handleItemClick = (
      index: number,
      path: string,
      onClick?: () => void
   ) => {
      setHighlightedIndex(index);
      // slugify the path
      if (path === "My Drive") {
         router.push(`/`, undefined);
         setToggle();
         return;
      }
      path = path
         .toLowerCase()
         .trim()
         .replace(/[^\w\s-]/g, "")
         .replace(/[\s_-]+/g, "-")
         .replace(/^-+|-+$/g, "");
      // console.log(path);
      router.push(`/?path=${path}`, undefined);
      setToggle();
   };
   useEffect(() => {
      if (searchParams?.get("path")) {
         const item = searchParams?.get("path") || "";
         setHighlightedIndex(itemsSlug.indexOf(item));
      }
   }, [searchParams?.get("path")]);

   return (
      <ul className="w-[90%] py-3 text-prim1 text-[13px] [&>li]:rounded-full [&>li]:m-1 [&>li]:w-full [&>li]:pl-3 [&>li]:py-1 cursor-pointer">
         {defaultItems.map((item, index) => (
            <li
               key={index}
               className={`flex align-middle ${
                  highlightedIndex === index ? "bg-extra1" : "hover:bg-seco2"
               }`}
               onClick={() => handleItemClick(index, item.text, item.onClick)}
            >
               {item.icon}
               {item.text}
            </li>
         ))}
      </ul>
   );
};

export default NavigationList;
