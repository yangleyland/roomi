import styled from 'styled-components';


/* eslint-disable-next-line */
export interface InfoProps {}

const StyledInfo = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,86,214,1) 100%);
  
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
        <HeaderText><Image src="/logo.png" alt={''}/></HeaderText>
        <SubText>live together. it's easy.</SubText>
        <Description>easily track chores and schedules with your roommates in real-time.</Description>
    </StyledInfo>
); 
}

export default Info;

const HeaderText = styled.div`

`;
const SubText = styled.div`
font-family: 'Helvetica';
font-style: normal;
font-weight: 700;
font-size: 35px;
line-height: 60px;
color: #0056D6;
width: 400px;
position: relative;
left:10px;
`;
const Description = styled.div`
  font-family: 'Helvetica';
font-style: normal;
font-weight: 300;
font-size: 24px;
line-height: 34px;
width: 400px;
position: relative;
left:10px;
`
const Image = styled.img `
  width: 400px;
`