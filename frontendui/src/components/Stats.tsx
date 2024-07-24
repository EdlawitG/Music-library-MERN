// src/components/Stats.js
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { space, color, flexbox } from "styled-system";
import theme from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsStart } from "../redux/songSlice";
import { RootState } from "../redux/store";

const StatsContainer = styled.div`
  ${flexbox}
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
`;

const Stat = styled.div`
  ${space}
  ${color}
  font-size: 24px
  background-color: ${() => theme.colors.cardBackground};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  margin: 0 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Stats = () => {
  const dispatch = useDispatch();
  const totals = useSelector((state: RootState) => state.song.totals);  
  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);
  return (   
    <StatsContainer>
      <Stat>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Total Albums <br/>{totals.totalAlbums} </p>
      </Stat>
      <Stat>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Total Artists <br/>{totals.totalArtists} </p>
      </Stat>
      <Stat>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Total Genres <br/>{totals.totalGenres} </p>
      </Stat>
      <Stat>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Total Songs <br/> {totals.totalSongs}</p>
      </Stat>
    </StatsContainer>
  );
};

export default Stats;
