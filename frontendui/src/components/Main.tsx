// src/components/Main.js
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { space } from "styled-system";
import Stats from "./Stats";
import AlbumCard from "./AlbumCard";
import { ReactComponent as MySVG } from "../Music-bro.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchSongsStart } from "../redux/songSlice";
const MainContainer = styled.main`
  ${space}
  padding: 2rem 0;
  text-align: center;
`;

const Main = () => {
    const dispatch = useDispatch();
    const artists = useSelector((state: RootState) => state.song.artists);
  
    useEffect(() => {
      dispatch(fetchSongsStart());
    }, [dispatch]);
  
  return (
    <MainContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>
          Music is the heartbeat of life. Create, edit, and curate your unique
          rhythm.
        </h1>
        <MySVG />
      </div>
      <Stats />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
       {artists.map((artist) => (
          <AlbumCard key={artist._id} album={artist.totalAlbums} artist={artist.artist} numOfSongs={artist.totalSongs} />
        ))}
      </div>
    </MainContainer>
  );
};

export default Main;
