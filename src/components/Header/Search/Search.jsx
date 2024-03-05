import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import icons from "../../../ultis/icons";
import axios from "../../../axios";

const { IoIosSearch } = icons;
const Search = ({ context }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let timeoutId;
  const [value, setValue] = context;
  const location = useLocation();

  useEffect(() => {
    // Đóng dropdown khi nhấp ra ngoài
    const handleClickOutside = (event) => {
      if (event.target.closest(".dropdown-container") === null) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);

      // Hủy bỏ timeout khi component unmount
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    // Nếu có sự kiện onChange mới, hủy bỏ timeout trước đó (nếu có)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Thiết lập timeout mới, sau 1 giây, gọi hàm gửi request
    timeoutId = setTimeout(() => {
      // Gửi request khi đã dừng nhập trong 1 giây
      sendSearchRequest(newSearchTerm);
    }, 1000);
  };

  const sendSearchRequest = async (term) => {
    try {
      // Mã hóa chuỗi trước khi thêm vào URL
      const encodedTerm = encodeURIComponent(term);

      // Thực hiện request sử dụng Axios
      const response = await axios.get(`api/songs?name=${encodedTerm}`);
      console.log("api", `api/songs?name=${term}`);
      // Lưu kết quả vào state searchResults
      setSearchResults(response.data);
      console.log("searchResults", searchResults.content);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // If there are no search results, return null
  if (searchResults.length === 0 && isDropdownOpen) {
    return null;
  }

  const click = (item) => {
    if (item && item.id) {
      const id = item.id;
      const type = "songs";
      setValue({ id, type });
    }
  };

  return (
    <div className="text-white relative">
      <div className="w-[350px] flex items-center">
        <span className=" bg-[#35403d] h-10 pl-4 flex justify-center items-center rounded-l-[20px] text-gray-500">
          <IoIosSearch size={20} />
        </span>
        <input
          type="text"
          value={searchTerm}
          className="outline-none w-[350px] bg-[#35403d] px-4 py-2 rounded-r-[20px] h-10 text-gray-200"
          placeholder="Tìm kiếm bài hát,nghệ sĩ,...."
          onChange={handleSearchChange}
        />
      </div>
      {/* Hiển thị dropdown kết quả tìm kiếm */}
      {searchResults &&
        searchResults.content &&
        searchResults.content.length > 0 &&
        isDropdownOpen && (
          <div className="dropdown-container absolute w-[350px] top-12 left-0 bg-gray-800 p-4 rounded-md shadow-md max-h-80 overflow-y-auto">
            <div className="overflow-hidden">
              {searchResults.content.map((result) => (
                <Link
                  to={location.pathname}
                  key={result.id}
                  onClick={() => click(result)}
                  className="flex items-center mb-4"
                >
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{result.name}</p>
                    {/* <p className="text-xs text-gray-500">
                      {result.artist.name}
                    </p> */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
export default Search;
