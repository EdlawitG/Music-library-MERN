import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { space, layout, typography, color } from "styled-system";
import { addSongStart } from "../redux/songSlice";
import { useNavigate } from "react-router-dom";

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

const AddSongForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [songDetails, setSongDetails] = useState({
    title: "",
    album: "",
    artist: "",
    genre: "",
  });

  const handleChange = (e: any) => {
    setSongDetails({
      ...songDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    dispatch(addSongStart(songDetails));
    history("/songs");
  };

  return (
    <Container>
      <Title>Add Song</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title of Song"
          name="title"
          value={songDetails.title}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Album"
          name="album"
          value={songDetails.album}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Artist"
          name="artist"
          value={songDetails.artist}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Genre"
          name="genre"
          value={songDetails.genre}
          onChange={handleChange}
        />
        <UploadLabel>
          Upload Image
          <UploadInput type="file" name="coverImage" />
        </UploadLabel>
        <Button type="submit">Add Song</Button>
      </Form>
    </Container>
  );
};
export default AddSongForm;
