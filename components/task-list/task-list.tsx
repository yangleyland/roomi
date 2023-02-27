import { getAuth } from "firebase/auth";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import initFirebase, { db } from "../../firebase/initFirebase";
import styles from "../../styles/Home.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateTasks } from "../../functions/taskFunctions";
import { updateScore } from "../../functions/roommateFunctions";

/* eslint-disable-next-line */
export interface TaskListProps {
  tasks: any;
  // clicked: Function;
  temp: number;
  uid: any;
  groupId: any;
  fetchData: any;
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
  const [internalTask, SetInternalTask] = useState(props.tasks);
  
  useEffect(() => {
    SetInternalTask(props.tasks);
    console.log("setInternalTask called");
  }, [props.tasks]);
  
  function handleClick(index: any, points: any, claimed: boolean) {
    console.log(internalTask);
    let newInternalTask = [...internalTask];
    newInternalTask[index].claimed = true;
    SetInternalTask(newInternalTask);
    console.log(newInternalTask);
    handleClick1(index, points, claimed);
  }
  async function handleClick1(index: any, points: any, claimed: boolean) {
    if (!claimed) {
      await updateTasks(props.groupId, index);
      await updateScore(props.uid, points);
      props.fetchData();
    }
  }
  return (
    <StyledTaskList>
      <InnerDiv>
        <NavbarText>Tasks</NavbarText>
        <TaskDiv>
          {internalTask.map((element: any, index: any) => (
            <TaskItem className={styles.taskItem}>
              <div>
                <TaskName style={{ margin: "10px 0 0 20px" }}>
                  {element.task}
                </TaskName>
                <p style={{ margin: "0 0 0 20px" }}>{element.points} points</p>
              </div>
              <Button
                onClick={() =>
                  handleClick(index, element.points, element.claimed)
                }
                style={{ backgroundColor: element.claimed ? "grey" : "blue" }}
              >
                claim task
              </Button>
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
`;
const TaskName = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
`;
const NavbarText = styled.p`
  color: black;
  width: 80%;
  font-size: 2em;
  /* border-bottom: 4px black solid; */
  padding-bottom: 9px;
  font-family: "Lato";
  margin: 0;
`;
const InnerDiv = styled.div`
  width: 90%;
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const TaskItem = styled.div`
  width: 364px;
  height: 63px;
  left: 32px;
  top: 370px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
`;
const TaskDiv = styled.div`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 30px;
  height: 85%;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: top;
`;
