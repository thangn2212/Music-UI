import icons from "./icons";

const { IoHomeOutline, BiCategory, FaRankingStar } = icons;

const sidebarMenu = [
  {
    path: "",
    text: "Home",
    end: true,
    icons: <IoHomeOutline size={24} />,
  },
  {
    path: "GENRE",
    text: "Thể loại",
    icons: <BiCategory size={24} />,
  },
  {
    path: "RANKING",
    text: "Bảng Xếp Hạng",
    icons: <FaRankingStar size={24} />,
  },
];
export default sidebarMenu;
