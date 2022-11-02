import styled from 'styled-components';
import styles from '../../styles/Home.module.css';


/* eslint-disable-next-line */
export interface PointsProps {}

const StyledPoints = styled.div`
  background-color: white;
  width: 40%;
  height: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
`;

export function Points(props: PointsProps) {
  return (
    <StyledPoints>
      <NavbarText>
        Points
      </NavbarText>
      <NameContainer>
        <ul>
            <li className={styles.names}>Leyland: 100</li>
            <li className={styles.names}>Isaac: 99</li>
            <li className={styles.names}>Albert: 98</li>
            <li className={styles.names}>Elijah: 97</li>
            <li className={styles.names}>Sam: 96</li>
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
