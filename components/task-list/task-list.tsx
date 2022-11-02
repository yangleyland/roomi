import styled from 'styled-components';
import styles from '../../styles/Home.module.css';

/* eslint-disable-next-line */
export interface TaskListProps {}

const StyledTaskList = styled.div`
  background-color: white;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export function TaskList(props: TaskListProps) {
  return (
    <StyledTaskList>
      <InnerDiv>
        <NavbarText>Tasks: ($DATE)</NavbarText>
        <TaskDiv>
            <ul>
                <li className={styles.taskItem}>Dishes</li>
                <li className={styles.taskItem}>Trash</li>
                <li className={styles.taskItem}>Vacuuming</li>
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
    background-color: #d9d9d9;
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
    background-color: #d9d9d9;
    display: flex;
    justify-content: flex-start;
    align-items: top;
    /* border: 1px solid black; */
    background-color: #eaeaea;
`