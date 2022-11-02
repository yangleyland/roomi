import styled from 'styled-components';
import NavbarAlt from '../../components/navbar-alt/navbar-alt';
import Login from '../../components/login/login';

export default function Home() {
  return (
    <MainWrapper>
      <NavbarAlt/>
      <Login/>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  background: white;
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;