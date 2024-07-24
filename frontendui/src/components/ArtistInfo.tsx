import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  deleteSongStart,
  fetchSongByIdStart,
  fetchSongsByArtistStart,
} from "../redux/songSlice";
import { useNavigate, useParams } from "react-router-dom";

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

const TableHeaderCell = styled.th`
  padding: 10px;
  border: none solid #ddd;
  text-align: center;
  font-weight: bold;
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

const ArtistInfo: React.FC = () => {
  const { artist } = useParams<{ artist: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const albumData = useSelector((state: RootState) => state.song.artist);
  useEffect(() => {
    if (artist) {
      dispatch(fetchSongsByArtistStart(artist));
    }
  }, [dispatch, artist]);

  if (!albumData) {
    return <div>Loading...</div>;
  }
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
      <Title>Artist Info</Title>
      <p style={{ fontWeight: "bold" }}>
        Number of Albums: {albumData.numberOfAlbums}
      </p>
      <p style={{ fontWeight: "bold" }}>
        Total Number of Songs: {albumData.totalNumberOfSongs}
      </p>
      {albumData.albums.map((album, index) => (
        <AlbumContainer key={index}>
          <AlbumHeader>
            <AlbumImage src="/image.png" alt={`${album.album} cover`} />
            <AlbumDetails>
              <AlbumName>{album.album}</AlbumName>
              <ArtistName>{artist}</ArtistName>
              <p style={{ fontWeight: "bold" }}>
                Total Number of Songs: {album.count}
              </p>
            </AlbumDetails>
          </AlbumHeader>
          <Table>
            <thead>
              <tr>
                <TableHeaderCell>Song</TableHeaderCell>
                <TableHeaderCell>Genre</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {album.songs.map((song: any) => (
                <TableRow key={song.id}>
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

export default ArtistInfo;
