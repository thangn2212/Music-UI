import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";

const GenreList = () => {
  const [genres, setGenres] = useState([]);

  //Gửi request và lấy dữ liệu data về cho genrelist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/genres");
        const convertData = { type: "genres", data: response.data.content };
        setGenres(convertData.data);
        // console.log("convertData", convertData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap px-2 py-5 mt-5">
      {genres.length > 0 ? (
        genres.map((genre) => (
          <Link
            to={`/genres/${genre.id}`}
            key={genre.id}
            className="w-[20%] flex-wrap block px-2 py-2 "
          >
            <div className="block rounded-lg shadow-lg">
              <img
                className="w-full object-cover h-[170.57px]  rounded-t-lg"
                src={genre.image}
                alt="Card"
              />
              <div className="px-6 py-4 rounded-b-lg bg-green-400">
                <div className="font-bold text-xl mb-2 ">
                  <span>{genre.name}</span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No genres available.</p>
      )}
    </div>
  );
};

export default GenreList;
