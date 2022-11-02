import Head from 'next/head';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import NavbarAlt from '../../components/navbar-alt/navbar-alt';
import Navbar from '../../components/navbar/navbar';
import Login from '../../components/login/login';
import Create from '../../components/create/create';

export default function Home() {
  return (
    <MainWrapper>
      <NavbarAlt/>
      <Create/>
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