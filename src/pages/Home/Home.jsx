import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./card";

// import axios from "../../axios";

const Home = () => {
  const [selectItem, setSelectItem] = useState(null);

  // Hàm xử lý khi click vào thẻ
  const handleCardClick = (item) => {
    // Chọn item và chuyển hướng đến trang Detail
    setSelectItem(item);
    // console.log(selectItem);
  };

  return (
    <div className="py-3 px-3">
      <div>
        {/* Hiển thị bài hát */}
        <div className="flex flex-col py-4 px-4 mb-3 bg-slate-900 rounded-xl">
          <div className="flex flex-row justify-between px-3 py-4 bg-slate-800 rounded-md">
            <div>Những bản nhạc hot nhất hiện nay</div>
            <div>
              <Link to="/listSong">Xem tất cả</Link>
            </div>
          </div>
          <div>
            <Card type="songs" />
          </div>
        </div>

        {/* Hiển thị thể loại */}
        <div className="flex flex-col py-4 px-4 mb-3 bg-slate-900 rounded-xl">
          <div className="flex flex-row justify-between px-3 py-4 bg-slate-800 rounded-md">
            <div>Thể loại nhạc</div>
            <div>
              <Link to="/genre">Xem tất cả</Link>
            </div>
          </div>
          <div>
            {/* Truyền hàm xử lý click và loại (genre) vào Card component */}
            <Card type="genres" onCardClick={handleCardClick} />
          </div>
        </div>

        {/* Hiển thị album */}
        <div className="flex flex-col py-4 px-4 mb-3 bg-slate-900 rounded-xl">
          <div className="flex flex-row justify-between px-3 py-4 bg-slate-800 rounded-md">
            <div>Album phổ biến</div>
            <div>
              <Link to="/album">Xem tất cả</Link>
            </div>
          </div>
          <div>
            <Card
              type="albums"
              // componentsType={"Detail"}
              // setSelectItem={setSelectItem}
              onCardClick={handleCardClick}
            />
          </div>
        </div>

        {/* Kiểm tra nếu có item đã chọn, hiển thị trang Detail */}
        {/* {setSelectItem && <Detail item={selectItem} />} */}
      </div>
    </div>
  );
};

export default Home;
