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
  
  


  useEffect(() => {
    async function fetchData() {
      const arr:any=[];
      props.members.forEach(async (member: any) => {
      if (member){
        console.log("member",member);
        const docRef = doc(db, "users", member);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("docSnap",docSnap.data().points)
            arr.push([docSnap.data().username,docSnap.data().points]);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        console.log("array",arr)
        
        
        if (users!=arr && arr.length==props.members.length){
          setUsers(arr);
        }
        
       
      }
      })
      
    }
    fetchData()
  }, [props.members,props.temp])


  console.log("tempVar",props.temp);
  useEffect(() => {
    setUsers(users);
  }, [users]);
  console.log("users:  ",users)

  return (
    <StyledPoints>
      <NavbarText>
        Scoreboard
      </NavbarText>
      <NameContainer>
            {users.map((user)=>(
              <ScoreContainer className={styles.names}>
                <p>{user[0]}</p>
                <p>{user[1]}</p>
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
