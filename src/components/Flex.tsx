import styled from 'styled-components';
interface Props {
  justifyContent?: string;
  width?: string;
  flexDirection?: string;
  flexWrap?: string;
  gap?: string;
  alignItems?: string;
  marginBottom?: string;
}

const Flex = styled.div<Props>`
  display: flex;
  justify-content: ${props => props.justifyContent || 'space-between'};
  flex-wrap: wrap;
  width: ${props => props.width || 'auto'};
  flex-direction: ${props => props.flexDirection || 'row'};
  flex-wrap: ${props => props.flexWrap || 'wrap'};
  gap: ${props => props.gap || 'auto'};
  align-items: ${props => props.alignItems || 'start'};
  margin-bottom: ${props => props.marginBottom || 'auto'};
`;

export default Flex;
