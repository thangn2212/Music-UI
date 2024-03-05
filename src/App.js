import { BrowserRouter, Routes, Route } from "react-router-dom";
import path from "./ultis/path";
import {
  Public,
  Home,
  GenreList,
  AlbumList,
  Detail,
  DetailFavorite,
  SongList,
  RankingList,
} from "./pages/index";
// import { Player } from "./components";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/*path /* thì với có dấu sao  đâu thì luôn đúng với tất cả thằng con*/}
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.GENRE} element={<GenreList />} />
            <Route path={path.ALBUM} element={<AlbumList />} />
            <Route path="/:type/:id" element={<Detail />} />
            <Route path={path.DETAILFAVORITE} element={<DetailFavorite />} />
            <Route path={path.SONGLIST} element={<SongList />} />
            <Route path={path.RANKING} element={<RankingList />} />
            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
