import styled from 'styled-components';
import Navbar from '../components/navbar/navbar';
import Info from '../components/info/info';
import firebase from '../firebase/initFirebase'

firebase()

export default function Index() {
  return (
    <MainWrapper>
      <Navbar/>
      <Info/>
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