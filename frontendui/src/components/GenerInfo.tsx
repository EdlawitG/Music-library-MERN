import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsStart } from "../redux/songSlice";
import { RootState } from "../redux/store";
import styled from "@emotion/styled";
// const Input = styled.input`
// padding:100px
//   margin-bottom:20px
//   border-radius: 12px
// `;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
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
const GenreInfo: React.FC = () => {
  const dispatch = useDispatch();
  // const [genre, setGenre] = useState("");
  const genres = useSelector((state: RootState) => state.song.songIn);
  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);
  // const handleKeyUp = (e: React.KeyboardEvent) => {
  //   if (e.key === "search here") {
  //     dispatch(fetchSongsStart());
  //   }
  // };

  return (
    <>
      <Title>Songs In Geners</Title>
      {/* <Input
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Enter genre"
        onKeyUp={handleKeyUp}
      /> */}
      <Table>
        <thead style={{ backgroundColor: "#eeeeff", fontWeight: "bold" }}>
          <tr>
            <TableCell>Genre</TableCell>
            <TableCell>No of Song</TableCell>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre, index) => (
            <TableRow key={index}>
              <TableCell key={genre.genre}>{genre._id}</TableCell>
              <TableCell>{genre.count} songs</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default GenreInfo;
