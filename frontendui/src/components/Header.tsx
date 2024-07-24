// src/components/Header.js
import React from "react";
import styled from "@emotion/styled";
import { space, flexbox } from "styled-system";
import theme from "../theme";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  ${flexbox}
  ${space}
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const Logo = styled.img`
  width: 7%;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Nav = styled.nav`
  ${flexbox}
  display: flex;
  gap: 8rem;
`;

const Button = styled.button`
  ${space}
  background-color: ${() => theme.colors.buttonBackground};
  color: ${() => theme.colors.buttonText};
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const NavLink = styled.a`
  color: ${() => theme.colors.text};
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: ${() => theme.colors.primary};
  }
`;

const Header = () => (
  <HeaderContainer>
    <Logo src="./logo.png" alt="logo" />
    <Nav>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/songs">Songs</NavLink>
      <NavLink href="/album">Albums</NavLink>
      <NavLink href="/genre">Genre</NavLink>
    </Nav>
    <Link to="/addsong">
      <Button>Add Song</Button>
    </Link>
  </HeaderContainer>
);

export default Header;
