import styled from 'styled-components';

import Points from '../../components/points/points';
import TaskList from '../../components/task-list/task-list';

/* eslint-disable-next-line */
export interface MainPageProps {}

const StyledMainPage = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

export function MainPage(props: MainPageProps) {
  return(
    <StyledMainPage>
        <Points/>
        <TaskList/>
    </StyledMainPage>
); 
}

export default MainPage;