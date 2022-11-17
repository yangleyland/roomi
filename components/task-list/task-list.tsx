import { getAuth } from 'firebase/auth';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import initFirebase, { db } from '../../firebase/initFirebase';
import styles from '../../styles/Home.module.css';
import {useAuthState} from "react-firebase-hooks/auth"


/* eslint-disable-next-line */
export interface TaskListProps {
  tasks: any;
  clicked: Function;
  temp: number;
}

const StyledTaskList = styled.div`
  background: transparent;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export function TaskList(props: TaskListProps) {
  const [tasks, setTasks] = useState(props.tasks);
  initFirebase();
  const auth=getAuth();
  const [user,loading] = useAuthState(auth);
  useEffect(() => {
    async function fetchData() {
      if (user){
        console.log("user id:")
        console.log(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) { 
          const docRef2 = doc(db, "groups", docSnap.data().group);
          const docSnap2 = await getDoc(docRef2);
          const taskArray:any=[];
          if (docSnap2.exists()) {
            if (docSnap2.data().tasks){
              docSnap2.data().tasks.forEach((element: any) => {
                taskArray.push([element.task,element.point,element.claimed]);
              });
              setTasks(taskArray);
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }      
        } else {
          // doc.data() will be undefined in this case
          console.log("No such user!");      
        }    
      }
    }
    fetchData()
  }, [props.temp])


  return (
    <StyledTaskList>
      <InnerDiv>
        <NavbarText>Tasks</NavbarText>
        <TaskDiv>
            {tasks.map((task:any)=>(
                  <TaskItem className={styles.taskItem}>
                    <div>
                      <TaskName style={{margin: '10px 0 0 20px'}}>{task[0]}</TaskName>
                      <p style={{margin:'0 0 0 20px'}}>{task[1]} points</p>
                    </div>
                    <Button style={{backgroundColor:task[2] ? 'grey':"blue"}} onClick={(tasker) => {props.clicked([task[0],task[1]])}}>claim task</Button>
                  </TaskItem>
                ))}
        </TaskDiv>
      </InnerDiv>
    </StyledTaskList>
  );
}

export default TaskList;
const Button = styled.button`
  margin: 10px;

  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: #4299e1;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  line-height: 26px;         
`
const TaskName = styled.p `
font-family: 'Lato';
font-style: normal;
font-weight: 700;
`;
const NavbarText = styled.p `
  color: black;
  width: 80%;
  font-size: 2em;
  /* border-bottom: 4px black solid; */
  padding-bottom: 9px;
  font-family: 'Lato';
  margin: 0;
`;
const InnerDiv = styled.div `
  width: 90%;
  height: 100%;
  background:transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const TaskItem = styled.div `
  width: 364px;
  height: 63px;
  left: 32px;
  top: 370px;
  background: #FFFFFF;
  border: 1px solid #DCDCDC;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
`
const TaskDiv = styled.div `
  width: 90%;
  margin-top: 10px;
  margin-bottom: 30px;
  height: 85%;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: top;
`
