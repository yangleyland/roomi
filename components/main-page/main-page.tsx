import { getAuth } from 'firebase/auth';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Points from '../../components/points/points';
import TaskList from '../../components/task-list/task-list';
import { db } from '../../firebase/initFirebase';

/* eslint-disable-next-line */
export interface MainPageProps {
  members:any;
  tasks:any;
  varChange: number;
}

const StyledMainPage = styled.div`
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(89,139,213,1) 100%);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function MainPage(props: MainPageProps) {
  const [temp,setTemp] = useState(0);
  const[pointTally,setPointTally]=useState([]);

  useEffect(() => { 
    setTemp(temp+1);
    }, [props.varChange]); 
  
  const mainClick = async (tasker: [string, number]) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user){
      const docRef1 = doc(db, "users", user.uid);
      await updateDoc(docRef1, {
      points: increment(tasker[1])
    });
    }



    const arr:any=[];
    const docRef = doc(db, "users", tasker[0]);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("docSnap",docSnap.data().points)
        arr.push([docSnap.data().username,docSnap.data().points]);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    setPointTally(arr);
    setTemp(temp+1);
  }
  
  return(
    <StyledMainPage>
        <Points members={props.members} userValues={pointTally} temp={temp}/>
        <TaskList tasks={props.tasks}  clicked={mainClick}/>
    </StyledMainPage>
); 
}

export default MainPage;