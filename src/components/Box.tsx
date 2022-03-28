import styled from 'styled-components';
import theme from '../theme';

const Box = styled.div`
  background: ${theme.palette.background.base};
  width: 25%;
  padding: 3%;
  border-radius: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(6)};
`;

export default Box;
