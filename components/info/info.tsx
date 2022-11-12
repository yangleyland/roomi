import router from 'next/router';
import styled from 'styled-components';


/* eslint-disable-next-line */
export interface InfoProps {}

const StyledInfo = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(89,139,213,1) 100%);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const handleLogIn =  () => {
  router.push("../signin");
}
const handleSignUp =  () => {
  router.push("../create");
}


export function Info(props: InfoProps) {
  return(
    <StyledInfo>
        <HeaderText><Image src="/logo.png" alt={''}/></HeaderText>
        <SubText>live together. it's easy.</SubText>
        <Description>easily track chores and schedules with your roommates in real-time.</Description>
        <LogInButton onClick={handleLogIn}>Log-in</LogInButton>
        <SignUpButton onClick={handleSignUp}>Create Account</SignUpButton>
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
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  width: 400px;
  position: relative;
  left:10px;
`
const Image = styled.img `
  width: 400px;
`
const LogInButton = styled.button`
  width: 150px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: 0;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  border-radius: .5rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  :hover {
      color: #fff;
      background-color: #0b5ed7;
      border-color: #0a58ca;
  }           
  margin-top: 20px;
`
const SignUpButton = styled.button`
  width: 150px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: 0;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  border-radius: .5rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  :hover {
      color: #fff;
      background-color: #0b5ed7;
      border-color: #0a58ca;
  }           
  margin: 10px;
`