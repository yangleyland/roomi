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
  background: transparent;
  width: 50%;
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
        <NavbarText>Tasks</NavbarText>
        <TaskDiv>
            {props.tasks.map((task:any)=>(
                  <TaskItem className={styles.taskItem}>
                    <div>
                      <TaskName style={{margin: '10px 0 0 20px'}}>{task[0]}</TaskName>
                      <p style={{margin:'0 0 0 20px'}}>{task[1]} points</p>
                    </div>
                    
                    <Button onClick={(tasker) => {props.clicked([task[0],task[1]])}}>claim task</Button>
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