import styled from 'styled-components';


/* eslint-disable-next-line */
export interface InfoProps {}

const StyledInfo = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function Info(props: InfoProps) {
  return(
    <StyledInfo>
        <HeaderText>Roomi.</HeaderText>
        <SubText>The one solution to keeping your apartment clean</SubText>
    </StyledInfo>
); 
}

export default Info;

const HeaderText = styled.div`
    color: black;
    font-size: 3em;
    margin: 10px;
`;
const SubText = styled.div`
    color: grey;
    margin: 10px;
    font-size: 1em;
`;