// src/components/Container.js
import styled from '@emotion/styled';
import { layout, space } from 'styled-system';
import theme from '../theme';
const Container = styled.div`
  ${layout}
  ${space}
  margin: 0 auto;
  padding: 0 1rem;
  width: ${() => theme.sizes.container}px;
`;

export default Container;
