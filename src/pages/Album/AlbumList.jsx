import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/albums");
        const convertData = { type: "albums", data: response.data.content };
        setAlbums(convertData.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap px-2 py-5 mt-5">
      {albums.length > 0 ? (
        albums.map((album) => (
          <Link
            to={`/albums/${album.id}`}
            key={album.id}
            className="w-[20%] flex-wrap block px-2 py-2 "
          >
            <div className="block rounded-lg shadow-lg">
              <img
                className="w-full object-cover h-[170.43px]  rounded-t-lg"
                src={album.image}
                alt="Card"
              />
              <div className="px-6 py-4 rounded-b-lg bg-green-400">
                <div className="font-bold text-xl mb-2 ">
                  <span>{album.name}</span>
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

export default AlbumList;
