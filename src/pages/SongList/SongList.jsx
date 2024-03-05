import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useLocation } from "react-router-dom";
import axios from "../../axios";
import icons from "../../ultis/icons";

const { IoEyeSharp } = icons;

const SongList = () => {
  const [songs, setSongs] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [value, setValue] = useOutletContext({});

  const location = useLocation();
  const request = async (page) => {
    try {
      const apiUrl =
        page === undefined ? `api/songs` : `api/songs?page=${page}`;
      const response = await axios.get(apiUrl);
      if (response.data && response.data.content) {
        setSongs(response.data);
        setTotalPages(response.data.totalPages);
        // console.log(response.data.content);
      } else {
        console.log("Invalid response data format:", response.data);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    request(currentPage);
  }, [currentPage]);

  // Hàm renderPageNumbers tạo ra một danh sách các nút số dựa trên tổng số trang và gọi hàm setCurrentPage khi người dùng bấm vào một trong chúng.
  const renderPageNumbers = () => {
    // Tạo một mảng chứa số thứ tự các trang từ 0 đến totalPages - 1
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

    // Hiển thị các nút số và gán sự kiện onClick để chuyển đến trang tương ứng
    return (
      <div className="flex">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`mx-1 ${
              currentPage === pageNumber ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    );
  };

  // Thêm một hàm tính số thứ tự
  const calculateSongIndex = (index) => {
    return index + currentPage * (songs.pageable.pageSize || 1) + 1;
  };

  const handleClick = (item) => {
    // console.log("currentPage", currentPage);
    const id = currentPage;
    const type = "songs";
    setValue({ id, type, item });
  };
  return (
    <div className="flex flex-col py-5 px-3 items-center">
      <ul className="list-disc text-left w-full mt-5">
        <div className="flex flex-row">
          <h4 className="w-10 text-xl">#</h4>

          <h4 className="">Tiêu đề</h4>
        </div>
        <div className="flex flex-col">
          {songs &&
            songs.content.map((song, index) => (
              <li key={song.id} className="flex flex-row">
                <div className="items-center ">
                  <div className="w-10 text-2xl items-center justify-center">
                    {calculateSongIndex(index)}
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
                <div className="flex flex-col w-full">
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
      <div className="flex mt-5">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
          }
          disabled={currentPage === 0}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SongList;
