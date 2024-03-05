import React, { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import axios from "../../axios";
import icons from "../../ultis/icons";

const { IoEyeSharp } = icons;

const Detail = () => {
  const [detailData, setDetailData] = useState();
  // Sử dụng useParams để trích xuất tham số từ URL
  const { id, type } = useParams();
  // Sử dụng hook useOutletContext để nhận giá trị từ context
  const [value, setValue] = useOutletContext({});
  // Sử dụng hook useLocation để lấy thông tin về URL hiện tại
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy dữ liệu chi tiết dựa trên type và id
        const response = await axios.get(`api/${type}/${id}`);

        setDetailData(response.data);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching detail data:", error);
      }
    };

    fetchData();
  }, [type, id]);

  // useEffect(() => {
  //   console.log("valueDetail", value);
  // }, [value]);

  /* 
  Kiểm tra xem detailData có giá trị hay không.
  Nếu detailData là null hoặc undefined, thì component sẽ trả về 
  một phần tử <p>  thay vì hiển thị nội dung của component
  */
  if (!detailData) {
    return <p>Loading...</p>;
  }

  const handleClick = (item) => {
    // Set giá trị mới cho context

    setValue({ id: id, type: type, item });
    // console.log("idDetail", id);
    // console.log("typeDetail", type);
    // console.log("itemDetail", item);
  };

  return (
    <div className="flex flex-col py-5  items-center">
      <div className="relative w-full h-[400px]">
        {/* Background gradient */}
        <div className="absolute inset-0 w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"></div>

        {/* Container for image and album information */}
        <div className="flex flex-row items-center pb-5 px-5 z-10 absolute bottom-0  ">
          {/* Album image */}
          <img
            src={detailData.image}
            alt={detailData.name}
            className="w-64 h-64 bg-gray-200 object-cover mb-4 mx-4 cursor-pointer"
          />

          {/* Album information */}
          <div className="flex flex-col  text-white text-center">
            <div className="">
              <h1 className=" py-10 text-5xl font-bold mb-2">
                {detailData.name}
              </h1>
            </div>
            <div className="flex flex-row pt-7">
              <p className="px-5">Số lượng bài hát: {detailData.data.length}</p>
              <p>Thời lượng </p>
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
          {detailData.data.map((song, index) => (
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
    </div>
  );
};

export default Detail;
