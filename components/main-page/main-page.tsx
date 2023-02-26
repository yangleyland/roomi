import { getAuth } from 'firebase/auth';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Points from '../../components/points/points';
import TaskList from '../../components/task-list/task-list';
import initFirebase, { db } from '../../firebase/initFirebase';

/* eslint-disable-next-line */
export interface MainPageProps {
  members:any;
  tasks:any;
  varChange: number;
}

const StyledMainPage = styled.div`
  background: transparent;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function MainPage(props: MainPageProps) {
  initFirebase();
  const [temp,setTemp] = useState(0);
  const[pointTally,setPointTally]=useState([]);

  useEffect(() => { 
    setTemp(temp+1);

  }, [props.varChange]); 
  
  const mainClick = async (tasker: [string, number]) => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (user){
        console.log("tasker0",user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {

            console.log("docSnap",docSnap.data().group)
            const docRef2 = doc(db, "groups", docSnap.data().group);
            const docSnap2 = await getDoc(docRef2);
            if (docSnap2.exists()){
              const taskArray: any[]=[];
              let run = false;
              docSnap2.data().tasks.forEach((element: {task: string; points: any; claimed: any; }) => {
                if (element.task==tasker[0] && element.claimed==false) {
                  run=true;
                }
              });
              if (run) {
                const docRef1 = doc(db, "users", user.uid);
                await updateDoc(docRef1, {
                  points: increment(tasker[1])
                });
              }
              docSnap2.data().tasks.forEach((element: {task: string; points: any; claimed: any; }) => {
                  if (element.task==tasker[0]) {
                    taskArray.push({task: element.task,points: element.points,claimed:true});
                  } else {
                    taskArray.push({task: element.task,points: element.points,claimed:element.claimed});
                  }
              });
              await updateDoc(docRef2, {
                tasks: taskArray
              });
            }
            

        } else {
          console.log("No such document!");
        }
    }

    setTemp(temp+1);
  }
  
  return(
    <StyledMainPage>
        <Points members={props.members} userValues={pointTally} temp={temp}/>
        <TaskList tasks={props.tasks} temp={temp}  clicked={mainClick}/>
    </StyledMainPage>
); 
}

export default MainPage;