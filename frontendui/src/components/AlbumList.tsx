import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  deleteSongStart,
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

const AlbumContainer = styled.div`
  margin-bottom: 40px;
`;

const AlbumHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AlbumImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 20px;
`;

const AlbumDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlbumName = styled.h2`
  margin: 0;
`;

const ArtistName = styled.p`
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: none solid #ddd;
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

const AlbumList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const albums = useSelector((state: RootState) => state.song.albums);
  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);
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
    window.location.reload();
  };
  return (
    <Container>
      <Title>Albums</Title>
      {albums.map((album, index) => (
        <AlbumContainer key={index}>
          <AlbumHeader>
            <AlbumImage src="./image.png" alt={`${album.album} cover`} />
            <AlbumDetails>
              <AlbumName>{album.album}</AlbumName>
              <ArtistName>{album.artist}</ArtistName>
              <p style={{ fontWeight: "bold" }}>
                Total Number of Song: {album.count}
              </p>
            </AlbumDetails>
          </AlbumHeader>
          <Table>
            <thead>
              <tr style={{ fontWeight: "bold" }}>
                <TableCell>Song</TableCell>
                <TableCell>Genre</TableCell>
              </tr>
            </thead>
            <tbody>
              {album.songs.map((song: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.genre}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(song.id)}>
                      <FaEdit style={{ color: "#3B5998", fontSize: "20px" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(song.id)}>
                      <FaTrash style={{ color: "#3B5998", fontSize: "20px" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </AlbumContainer>
      ))}
    </Container>
  );
};

export default AlbumList;
