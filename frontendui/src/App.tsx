import { ThemeProvider } from "@emotion/react";
import Container from "./components/Container";
import Header from "./components/Header";
import Main from "./components/Main";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import SongList from "./components/SongList";
import AlbumList from "./components/AlbumList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenreInfo from "./components/GenerInfo";
import AddSongForm from "./components/AddSong";
import EditSong from "./components/EditSong";
import ArtistInfo from "./components/ArtistInfo";
const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/songs" element={<SongList />} />
            <Route path="/album" element={<AlbumList />} />
            <Route path="/genre" element={<GenreInfo />} />
            <Route path="/addsong" element={<AddSongForm />} />
            <Route path="/editsong/:id" element={<EditSong />} />
            <Route path="/view-detail/:artist" element={<ArtistInfo />} />
            </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
