import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  deleteSongStart,
  fetchGenresStart,
  fetchSongByIdStart,
  fetchSongsStart,
} from "../redux/songSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  margin: 10px;
  padding: 10px 40px;
  border: none;
  border-radius: 10px;
  background-color: #eeeeff;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e0e0e0;
  }
  &.active {
    background-color: #3b5998;
    color: white;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #d4d4f83f;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: none solid #d4d4f83f;
  text-align: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #3b82f6;
  &:hover {
    color: #1e40af;
  }
`;

const SongList: React.FC = () => {
  const filters = [
    "All",
    "HipHop",
    "Rock",
    "Pop",
    "Classical",
    "Electronic",
    "Blues",
    "Reggae",
    "K-pop",
    "Folk",
    "Country",
    "Punk",
  ];
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songs = useSelector((state: RootState) => state.song.songs);
  useEffect(() => {
    if (selectedFilter === "All") {
      dispatch(fetchSongsStart());
    } else {
      dispatch(fetchGenresStart(selectedFilter));
    }
  }, [selectedFilter, dispatch]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };
  const handleEdit = (id: string) => {
    if (id) {
      dispatch(fetchSongByIdStart(id));
      navigate(`/editsong/${id}`);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongStart(id));
    }
    navigate("/songs");
  };
  const filteredSongs =
    selectedFilter === "All"
      ? songs
      : songs.filter((song) => song.genre === selectedFilter);
  return (
    <Container>
      <Title>Songs</Title>
      <FilterContainer>
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            className={filter === selectedFilter ? "active" : ""}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </FilterContainer>
      <Table>
        <thead style={{ backgroundColor: "#eeeeff", fontWeight: "bold" }}>
          <tr>
            <TableCell>Album</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Song</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.map((song, index) => (
            <TableRow key={index}>
              <TableCell>{song.album}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.genre}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(song._id)}>
                  <FaEdit style={{ color: "#3B5998", fontSize: "20" }} />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(song._id)}>
                  <FaTrash style={{ color: "#3B5998", fontSize: "20" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SongList;
