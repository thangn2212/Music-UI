import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import axios from "../../axios";

// Khai báo component Card với các props nhận được từ component cha
const Card = ({ type, setSelectItem, componentsType, onCardClick }) => {
  // Sử dụng useState để lưu trữ trạng thái dữ liệu từ API
  const [data, setData] = useState([]);
  // Sử dụng hook useOutletContext để nhận giá trị từ context
  const [value, setValue] = useOutletContext({});
  // Sử dụng hook useLocation để lấy thông tin về URL hiện tại
  const location = useLocation();
  // Sử dụng hook useNavigate để chuyển hướng qua các route
  const navigate = useNavigate();

  // Sử dụng useEffect để gọi API và lấy dữ liệu khi component được render ở trang home
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sử dụng switch statement bên ngoài hàm axios.get để xác định URL dựa trên giá trị của 'encode'.
        const url = `api/${type}`;
        // Gọi API với URL đã xác định
        const response = await axios.get(url);
        const convertData = { type: type, data: response.data.content };
        // console.log("response", response.data.content);
        setData(convertData.data);
        // console.log("data", convertData.data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
    // Gọi hàm fetchData khi component được render hoặc 'type' thay đổi
    fetchData();
  }, [type]);

  // Hàm để xác định URL dựa trên giá trị của 'type'
  const determineURL = (item) => {
    // console.log(location);
    switch (type) {
      case "genres":
        return `/${type}/${item.id}`;
      case "albums":
        return `/${type}/${item.id}`;
      default:
        return location.pathname;
    }
  };

  // Hàm xử lý sự kiện click trên mỗi thẻ Link
  const click = (item, type) => {
    if (type === "genres" || type === "albums") {
      // Gọi hàm xử lý click từ props để chọn item và chuyển hướng
      onCardClick(item, type);
      // Set item đã chọn để sử dụng ở các thành phần khác (nếu cần)
      // setSelectItem({ id: item.id, type: componentsType });
      // Sử dụng navigate để chuyển hướng
      navigate(determineURL(item));
    } else {
      // Nếu không phải là 'genre' hoặc 'album', set giá trị mới cho context
      setValue({ id: item.id, type: "songs" });
    }
  };

  return (
    <div className="flex flex-wrap px-2 py-2 ">
      {data.length > 0 ? (
        data.slice(0, 8).map((item) => (
          <Link
            to={determineURL(item)}
            key={item.id}
            onClick={() => click(item, type)}
            className="w-[12%] flex-wrap block px-2 py-2"
          >
            {/* {console.log(item)} lay ra gia tri */}
            <div className="block rounded-lg shadow-lg">
              <img
                className="w-full object-cover h-[96.34px]  rounded-t-lg"
                src={item.image}
                alt="Card"
              />
              <div className="px-6 py-1 rounded-b-lg bg-green-400">
                <div className="font-bold text-xl mb-2 ">
                  <span className="block overflow-hidden whitespace-nowrap overflow-ellipsis text-xs">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Card;
