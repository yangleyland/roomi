import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/initFirebase';
import styles from '../../styles/Home.module.css';


/* eslint-disable-next-line */
export interface PointsProps {
  members:any;
  temp: number;
  userValues:any;
}

const StyledPoints = styled.div`
  background: transparent;

  width: 50%;
  height: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
`;

export function Points(props: PointsProps) {
  const [users, setUsers] = useState([]);
  
  
  return (
    <StyledPoints>
      <NavbarText>
        Scoreboard
      </NavbarText>
      <NameContainer>
            {props.members.map((user:any)=>(
              <ScoreContainer className={styles.names}>
                <p>{user.name}</p>
                <p>{user.points}</p>
              </ScoreContainer>
            ))}
      </NameContainer>
    </StyledPoints>
  );
}

export default Points;
const ScoreContainer = styled.div`
  list-style-type: none;
  margin: 30px;
  font-size: 1.5em;
  background-color:white;
  padding: 1px 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #DCDCDC;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`

const NavbarText = styled.p `
  margin: 0 30px 1px 40px;
  font-family: 'Lato';
  color: black;
  font-size: 2em;
  padding-bottom: 10px;
`;

const NameContainer=styled.div`
    width: 100%;
    height: 100%;
    
`;
