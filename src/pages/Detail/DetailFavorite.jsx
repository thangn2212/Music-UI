import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import icons from "../../ultis/icons";
import axios from "../../axios";

const { IoEyeSharp } = icons;

const DetailFavorite = () => {
  const location = useLocation();
  const [cookies] = useCookies(["favorites"]);
  //Trong trường hợp detailData.data có thể không được định nghĩa ban đầu, bạn nên kiểm tra nó trước khi truy cập thuộc tính length để tránh lỗi
  const [detailData, setDetailData] = useState({
    name: "Bài hát yêu thích",
    image: "",
    data: [],
  });
  const [value, setValue] = useOutletContext({});

  const fetchFavoriteSongs = async () => {
    try {
      // Lấy danh sách ID bài hát từ cookies
      const songIds = cookies.favorites || [];
      // Tạo đường dẫn API dựa trên danh sách ID bài hát
      const apiPath = `/api/songs?playlist=${songIds.join(",")}`;
      // Gửi request tới API để lấy thông tin về danh sách bài hát
      const response = await axios.get(apiPath);
      // console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching favorite songs:", error);
      return [];
    }
  };

  const fetchData = async () => {
    const favoriteSongs = await fetchFavoriteSongs();
    // console.log("favoriteSongs", favoriteSongs);
    setDetailData({
      name: "Bài hát yêu thích",
      image: favoriteSongs?.[0]?.image || "",
      data: favoriteSongs,
    });
  };

  // Sử dụng useEffect để theo dõi thay đổi trong danh sách bài hát yêu thích hoặc đường dẫn trang
  useEffect(() => {
    // Gọi hàm fetchData() khi có sự thay đổi
    fetchData();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleClick = async (item) => {
    const id = ""; // Đảm bảo khai báo id
    const type = "favorites"; // Đảm bảo khai báo type
    await setValue({ id, type, item });
  };

  // useEffect(() => {
  //   console.log("useEffect is triggered");
  //   console.log("value", value);
  // }, [value]);

  // useEffect(() => {
  //   console.log("detailData.data", detailData.data);
  // }, [detailData]);
  // useEffect(() => {
  //   console.log("detailData.data", detailData.data);
  // }, [detailData.data]);

  return (
    <div className="flex flex-col py-5  items-center">
      <div className="relative w-full h-[400px]">
        {/* Background gradient */}
        <div className="absolute inset-0 w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"></div>

        {/* Container for image and album information */}
        <div className="flex flex-row items-center pb-5 px-5 z-10 absolute bottom-0  ">
          {/* Album image */}
          <img
            src={
              detailData?.image ||
              "https://hanoispiritofplace.com/wp-content/uploads/2016/07/hinh-nen-trai-tim-5.jpg"
            }
            alt={detailData?.name || "Album Yêu Thích"}
            className="w-64 h-64 bg-gray-200  object-cover mb-4 mx-4 cursor-pointer"
          />

          {/* Album information */}
          <div className="flex flex-col  text-white text-center">
            <div className="">
              <h1 className=" py-10 text-5xl font-bold mb-2">
                {detailData.name}
              </h1>
            </div>
            <div className="flex flex-row pt-7">
              <p className="px-5">
                Số lượng bài hát: {detailData.data ? detailData.data.length : 0}
              </p>
              <p>
                {" "}
                Thời lượng:{" "}
                {detailData.data.content?.length >= 0 &&
                  formatTime(
                    detailData.data.content.reduce(
                      (sum, song) => sum + song.duration,
                      0
                    )
                  )}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-disc text-left w-full mt-5">
        <div className="flex flex-row">
          <h4 className="w-10 text-xl">#</h4>

          <h4 className="">Tiêu đề</h4>
        </div>
        <div className="flex flex-col">
          {Array.isArray(detailData.data.content) &&
            detailData.data.content.map((song, index) => (
              <li key={song.id} className="flex flex-row">
                <div className="items-center ">
                  <div className="w-10 text-2xl items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <Link
                  className="pr-5"
                  to={location.pathname}
                  onClick={() => handleClick(song)}
                >
                  <img
                    src={song.image}
                    alt={song.name}
                    className="w-10 h-10 object-cover my-2 "
                  />
                </Link>
                <div className="w-full flex flex-col">
                  <Link
                    className="text-xl"
                    to={location.pathname}
                    onClick={() => handleClick(song)}
                  >
                    {song.name}
                  </Link>
                  <div>{song.artist.name}</div>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <div>
                    <IoEyeSharp />
                  </div>
                  <div>{song.queryCount}</div>
                </div>
              </li>
            ))}
        </div>
      </ul>
    </div>
  );
};
export default DetailFavorite;
