import React from "react";
import styled from "@emotion/styled";
import theme from "../theme";
import { Link } from "react-router-dom";

interface AlbumCardProps {
  album: string;
  artist: string;
  numOfSongs: number;
}

const Card = styled.div`
  border-radius: 8px;
  padding: 10px;
  margin: 30px;
  width: 500px;
  display: flex;
  align-items: center;
`;

const AlbumImage = styled.img`
  width: 175px;
  height: 175px;
  margin-right: 10px;
`;

const AlbumDetails = styled.div`
  font:24px
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  background-color: ${() => theme.colors.buttonBackground};
  margin-top: 10px;
  padding: 8px 20px;
  color: white;
  border: none;
  border-radius: 13px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AlbumCard: React.FC<AlbumCardProps> = ({ album, artist, numOfSongs }) => (
  <Card>
    <AlbumImage src="./image.png" alt="coverImage" />
    <AlbumDetails>
      <p style={{fontWeight:"bolder"}}>NoOfAlbum:{album}</p>
      <p style={{fontWeight:"bolder"}}>Artist: {artist}</p>
      <p style={{fontWeight:"bolder"}}>NoOfSongs: {numOfSongs}</p>
      <Link to={`/view-detail/${artist}`}><Button>View Detail</Button></Link>
      </AlbumDetails>
  </Card>
);

export default AlbumCard;
