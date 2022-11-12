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
  background-color: white;
  width: 40%;
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
        Points
      </NavbarText>
      <NameContainer>
        <ul>
            {users.map((user)=>(
              <li className={styles.names}>{user[0]}: {user[1]}</li>
            ))}
        </ul>
      </NameContainer>
    </StyledPoints>
  );
}

export default Points;

const NavbarText = styled.p `
  margin: 100px 30px 1px 40px;
  color: black;
  font-size: 2em;
  padding-bottom: 10px;
  border-bottom: 4px black solid;
`;
const NameContainer=styled.div`
    width: 100%;
    height: 100%;

`;
