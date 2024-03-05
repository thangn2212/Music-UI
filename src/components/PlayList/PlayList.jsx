import React from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import path from "../../ultis/path";

const PlayList = () => {
  // Sử dụng react-cookie để lấy thông tin từ cookie
  const [cookies] = useCookies(["favorites"]);

  // Lấy danh sách các bài hát được yêu thích từ cookie
  const favoriteSongs = cookies.favorites || [];

  return (
    <div className="flex flex-col text-white">
      <div className="w-full h-[70px] px-[25px] py-[15px] flex justify-center items-center">
        <div>PlayList</div>
      </div>

      <div className="flex flex-col">
        <NavLink to={path.DETAILFAVORITE}>
          <div className="flex items-center p-4 bg-gray-800 mb-4 rounded-md">
            {/* Bạn có thể thay đổi đường dẫn và alt phù hợp với ảnh của playlist ưa thích */}
            <img
              className="w-16 h-16 object-cover rounded mr-4"
              src="https://c2.staticflickr.com/8/7628/27739307291_c43b62d5df_b.jpg"
              alt="Thumbnail"
            />

            {/* Album Name */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Album Ưa Thích</h3>
              {/* Hiển thị số lượng bài hát đã được yêu thích */}
              <p className="text-sm text-gray-400">
                {favoriteSongs.length} bài hát đã được yêu thích
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default PlayList;
