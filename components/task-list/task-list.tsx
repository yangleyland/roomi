import { getAuth } from 'firebase/auth';
import { doc, increment, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { db } from '../../firebase/initFirebase';
import styles from '../../styles/Home.module.css';


/* eslint-disable-next-line */
export interface TaskListProps {
  tasks: any;
  clicked: Function;
}

const StyledTaskList = styled.div`
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(89,139,213,1) 100%);


  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export function TaskList(props: TaskListProps) {

    const auth = getAuth();
    const user = auth.currentUser;
    console.log("taskprops",props.tasks)
  return (
    <StyledTaskList>
      <InnerDiv>
        <NavbarText>Tasks: ($DATE)</NavbarText>
        <TaskDiv>
            <ul>
                {props.tasks.map((task:any)=>(
                  <li className={styles.taskItem}><p>{task[0]}: {task[1]} points</p><button onClick={(tasker) => {props.clicked([task[0],task[1]])}}>claim task</button></li>
                ))}
           
            </ul>
        </TaskDiv>
      </InnerDiv>
    </StyledTaskList>
  );
}

export default TaskList;

const NavbarText = styled.p `
  color: black;
  margin: 30px;
  font-size: 2em;
`;
const InnerDiv = styled.div `
    width: 90%;
    margin-top: 40px;
    height: 85%;
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(89,139,213,1) 100%);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const TaskDiv = styled.div `
    width: 90%;
    margin-top: 40px;
    margin-bottom: 30px;
    height: 85%;
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(89,139,213,1) 100%);

    display: flex;
    justify-content: flex-start;
    align-items: top;
    /* border: 1px solid black; */
    background-color: #eaeaea;
`