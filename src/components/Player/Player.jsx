import React, { useState, useRef, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import icons from "../../ultis/icons";
import axios from "../../axios";
import { useCookies } from "react-cookie";
import "react-h5-audio-player/lib/styles.css";

const { IoMdHeartEmpty, FaDownload, FaHeart } = icons;

const Player = ({ id, type, item }) => {
  const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  // Sử dụng state mới này để lưu trạng thái yêu thích của từng bài hát
  const [likedSongs, setLikedSongs] = useState({});
  const [cookies, setCookie] = useCookies(["favorites"]);
  const player = useRef();
  // State để theo dõi liệu yêu cầu API đã được gửi cho bài hát hiện tại chưa
  const [apiRequestSent, setApiRequestSent] = useState(false);
  // Để kiểm tra xem yêu cầu đã được gửi hay chưa
  const [hasSentApiRequest, setHasSentApiRequest] = useState(false);

  const FetchAxios = async () => {
    try {
      let response;
      if (type === "songs") {
        if (item) {
          if (id !== 0) {
            response = await axios.get(`api/songs?page=${id}`);
            setTracks(response.data.content);
          } else {
            response = await axios.get(`api/songs`);
            setTracks(response.data.content);
          }
        } else {
          response = await axios.get(`api/songs/${id}`);
          setTracks([response.data]);
          console.log("response.data", [response.data]);
        }
        // console.log("tracks", tracks);
      } else if (type === "albums" || type === "genres") {
        response = await axios.get(`api/${type}/${id}`);
        setTracks(response.data.data);
      } else if (type === "favorites") {
        const favoritesFromCookie = cookies.favorites || [];
        const apiPath = `/api/songs?playlist=${favoritesFromCookie.join(",")}`;

        response = await axios.get(apiPath);
        setTracks(response.data.content);
      } else if (type === "ranking") {
        if (id !== 0) {
          response = await axios.get(
            `api/songs?sort=query_count,desc&page=${id}`
          );
          setTracks(response.data.content);
        } else {
          response = await axios.get(`api/songs?sort=query_count,desc`);
          setTracks(response.data.content);
        }
      }
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    if (type === "favorites") {
      FetchAxios();
      return;
    }
    if (type === "ranking") {
      FetchAxios();
      return;
    }
    if (type === "songs") {
      FetchAxios();
      return;
    }
    if (id && type) {
      FetchAxios();
      // console.log("tracks", tracks);
    }
  }, [id, type, item]);

  // Effect hook để xác định chỉ mục của bài hát được click và cập nhật giá trị trackIndex
  useEffect(() => {
    // Kiểm tra nếu có thông tin về bài hát và mảng tracks không rỗng
    if (item && tracks.length > 0) {
      // Tìm chỉ mục của bài hát trong mảng tracks bằng cách so sánh id
      const clickedItemIndex = tracks.findIndex(
        (track) => track.id === item.id
      );

      // Đặt giá trị trackIndex tương ứng với chỉ mục của bài hát được click, nếu không tìm thấy, đặt về 0
      if (clickedItemIndex !== -1) {
        setTrackIndex(clickedItemIndex >= 0 ? clickedItemIndex : 0);
      }
      console.log("trackIndex", trackIndex);
    } else if (!item && tracks.length > 0) {
      setTrackIndex(0);
    }
  }, [id, type, item, tracks]);

  // Lưu thông tin vào Local Storage khi có sự thay đổi
  useEffect(
    () => {
      // Lưu giá trị của biến trackIndex vào localStorage với key là "trackIndex"
      // LocalStorage.setItem là phương thức lưu một key-value pair vào localStorage
      // Lưu giá trị của biến currentTime vào localStorage với key là "currentTime"
      localStorage.setItem("trackIndex", trackIndex);
      if (currentTime) {
        localStorage.setItem("currentTime", currentTime);
      }
      // console.log("localStorage", localStorage.getItem("currentTime"));\
    },
    [trackIndex, currentTime] // useEffect sẽ chỉ chạy lại khi giá trị của trackIndex hoặc currentTime thay đổi
  );

  // Xử lý trường hợp người dùng xóa Local Storage
  // Kiểm tra xem key "trackIndex" có tồn tại trong Local Storage hay không
  // Nếu key không tồn tại, nghĩa là Local Storage đã bị xóa, thì thiết lập giá trị trackIndex về mặc định là 0
  // này chỉ chạy một lần sau khi component được mounted, vì dependency array là rỗng
  useEffect(() => {
    if (localStorage.getItem("trackIndex") === null) {
      setTrackIndex(0);
      // console.log("trackIndex1111", trackIndex);
    }
  }, []);

  // Effect hook để cập nhật likedSongs dựa trên cookie khi component được mount
  useEffect(() => {
    const favoritesFromCookie = cookies.favorites || [];
    const newLikedSongs = {};

    if (Array.isArray(tracks)) {
      // Trường hợp "tracks" là mảng
      tracks.forEach((track) => {
        // console.log();
        newLikedSongs[track.id] = favoritesFromCookie.includes(track.id);
      });
    } else if (typeof tracks === "object" && tracks !== null) {
      // Trường hợp "tracks" là đối tượng
      // Xử lý logic tương ứng với đối tượng
      newLikedSongs[tracks.id] = favoritesFromCookie.includes(tracks.id);
    }

    // Cập nhật likedSongs với trạng thái mới từ cookie
    setLikedSongs(newLikedSongs);
  }, [cookies.favorites]);

  //Xử lí việc click nút prev
  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? tracks.length - 1 : currentTrack - 1
    );
  };

  //Xử lí việc click nút next
  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < tracks.length - 1 ? currentTrack + 1 : 0
    );
  };

  // useEffect được sử dụng để xử lý các side effect khi có sự thay đổi
  //  trong dependency array, trong trường hợp này là 'player'.
  useEffect(() => {
    // console.log(player.current);
    if (player?.current) {
      player.current.audio.current.currentTime =
        localStorage.getItem("currentTime");
    }
  }, [player]);

  const handleDownloadClick = async () => {
    // Tạo một thẻ <a> để tải xuống bài hát
    const downloadLink = document.createElement("a");

    // Đặt URL của bài hát cho thuộc tính href
    downloadLink.href = tracks[trackIndex].songUrl;
    // console.log("tracks[trackIndex].songUrl", tracks[trackIndex].songUrl);
    // Đặt tên file tải xuống với định dạng .mp3
    downloadLink.download = `${tracks[trackIndex].name}.mp3`;

    // Đặt thuộc tính target="_blank" để mở trong tab mới
    downloadLink.target = "_blank";

    // Thêm thẻ <a> vào body của trang
    document.body.appendChild(downloadLink);

    // Kích hoạt sự kiện click trên thẻ <a> để bắt đầu quá trình tải xuống
    downloadLink.click();

    // Xóa thẻ <a> sau khi đã sử dụng
    document.body.removeChild(downloadLink);
  };

  // Hàm xử lý khi người dùng click nút yêu thích (heart)
  const handleHeartClick = () => {
    // Đảo ngược trạng thái yêu thích của bài hát hiện tại
    const newLikedStatus = !likedSongs[tracks[trackIndex].id];

    // Cập nhật trạng thái yêu thích trong state likedSongs
    setLikedSongs((prevLikedSongs) => ({
      // Giữ nguyên các giá trị của trạng thái trước đó (prevLikedSongs)
      ...prevLikedSongs,
      // Cập nhật trạng thái mới cho bài hát hiện tại, sử dụng id của bài hát làm key
      [tracks[trackIndex].id]: newLikedStatus,
    }));

    // Gọi hàm cập nhật trạng thái yêu thích trong cookie
    updateFavorites(tracks[trackIndex].id, newLikedStatus);
  };

  // Hàm cập nhật trạng thái yêu thích của bài hát trong cookie
  const updateFavorites = (songId, liked) => {
    // Lấy danh sách bài hát yêu thích từ cookie
    const favorites = cookies.favorites || [];

    // Nếu bài hát được yêu thích, thêm vào danh sách nếu chưa tồn tại
    if (liked) {
      if (!favorites.includes(songId)) {
        favorites.push(songId);
      }
    } else {
      // Nếu bài hát không được yêu thích, loại bỏ khỏi danh sách nếu tồn tại
      const index = favorites.indexOf(songId);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    }

    // Cập nhật cookie với danh sách mới
    setCookie("favorites", favorites, { path: "/" });
  };

  const postApiRequest = async () => {
    try {
      // Thay thế 'YOUR_API_ENDPOINT' bằng điểm cuối thực tế để gửi yêu cầu API
      if (!apiRequestSent && hasSentApiRequest === false) {
        setHasSentApiRequest(true);

        if (item) {
          await axios.put(`/api/songs/${tracks[trackIndex].id}/query-count`);
          console.log("api", `/api/songs/${tracks[trackIndex].id}/query-count`);
        } else {
          await axios.put(`/api/songs/${id}/query-count`);
          console.log("api", `/api/songs/${id}/query-count`);
        }
        // Đánh dấu rằng yêu cầu đã được gửi
        setApiRequestSent(true);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu API: ", error);
    }
  };

  useEffect(() => {
    setApiRequestSent(false);
    setHasSentApiRequest(false);
  }, [id, type, trackIndex, tracks[trackIndex]]);

  // useEffect(() => {
  //   console.log("tracks[trackIndex]", tracks[trackIndex]);
  //   console.log("trackIndex", trackIndex);
  // }, [tracks, trackIndex]);

  return (
    <>
      {tracks[trackIndex] && (
        <div className="w-full h-[50px]">
          <div className="w-full flex flex-auto bg-main-100">
            <div className=" flex w-full h-full items-center justify-center bottom-0 ">
              <div className="w-[30%] h-full flex-between flex gap-3 px-3 py-3 items-center justify-center ">
                <img
                  src={tracks[trackIndex].image}
                  alt="thumbnail"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-sm">
                    {tracks[trackIndex].name}
                  </span>
                  <span className="text-xs  text-white">
                    {tracks[trackIndex].artist.name}
                  </span>
                </div>
                <div className="flex gap-4 pl-2">
                  <span onClick={handleHeartClick}>
                    {likedSongs[tracks[trackIndex].id] ? (
                      <FaHeart size={16} />
                    ) : (
                      <IoMdHeartEmpty size={16} />
                    )}
                  </span>
                  <span
                    onClick={handleDownloadClick}
                    className="cursor-pointer"
                  >
                    <FaDownload size={16} />
                  </span>
                </div>
              </div>
              <AudioPlayer
                volume={0.5}
                className="custom-audio-player"
                autoPlay
                preload={"metadata"}
                autoPlayAfterSrcChange={true}
                src={tracks[trackIndex].songUrl}
                ref={player}
                showSkipControls={true}
                onClickPrevious={handleClickPrevious}
                onClickNext={handleClickNext}
                onEnded={handleClickNext}
                layout={"horizontal"}
                onListen={(e) => {
                  setCurrentTime(e.target.currentTime);
                  // Kiểm tra xem đã nghe hơn nửa bài hát chưa
                  if (
                    !apiRequestSent &&
                    e.target.currentTime >= tracks[trackIndex].duration / 2
                  ) {
                    // Gửi yêu cầu API
                    postApiRequest();
                  }
                }}
                style={{
                  backgroundColor: "black",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
