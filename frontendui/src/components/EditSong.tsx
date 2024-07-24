import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { editSongStart } from "../redux/songSlice";
import { color, layout, space, typography } from "styled-system";
import styled from "@emotion/styled";
const Container = styled.div`
  ${layout}
  ${space}
  margin: 0 auto;
  max-width: 500px;
  padding: 5rem;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  ${space}
  ${layout}
  ${typography}
  ${color}
  padding: 1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  ${space}
  ${layout}
  ${typography}
  ${color}
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #3f51b5;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #303f9f;
  }
`;

const UploadLabel = styled.label`
  ${space}
  ${layout}
  ${typography}
  ${color}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
`;
const UploadInput = styled.input`
  display: none;
`;

const Title = styled.h1`
  ${typography}
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;
`;

const EditSong: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const song = useSelector((state: RootState) => state.song.song);
  const [songDetails, setFormState] = useState({
    album: "",
    artist: "",
    title: "",
    genre: "",
  });
  useEffect(() => {
    if (song) {
      setFormState({
        album: song.album,
        artist: song.artist,
        title: song.title,
        genre: song.genre,
      });
    }
  }, [song]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...songDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      editSongStart({
        id: id,
        ...songDetails,
      })
    );
    navigate(-1)
  };

  if (!song) return <div>Loading...</div>;

  return (
    <Container>
      <Title>Edit Song</Title>
      <Form onSubmit={handleSubmit}>
        <label style={{fontWeight:"bold", fontSize:"20px"}}>Title</label>
        <Input
          type="text"
          placeholder="Title of Song"
          name="title"
          value={songDetails.title}
          onChange={handleChange}
        />
         <label style={{fontWeight:"bold", fontSize:"20px"}}>Album</label>
        <Input
          type="text"
          placeholder="Album"
          name="album"
          value={songDetails.album}
          onChange={handleChange}
        />
         <label style={{fontWeight:"bold", fontSize:"20px"}}>Artist</label>
        <Input
          type="text"
          placeholder="Artist"
          name="artist"
          value={songDetails.artist}
          onChange={handleChange}
        />
         <label style={{fontWeight:"bold", fontSize:"20px"}}>Genre</label>
        <Input
          type="text"
          placeholder="Genre"
          name="genre"
          value={songDetails.genre}
          onChange={handleChange}
        />
        {/* <UploadLabel>
          Upload Image
          <UploadInput type="file" name="coverImage" />
        </UploadLabel> */}
        <Button type="submit">Update Song</Button>
      </Form>
    </Container>
  );
};

export default EditSong;
