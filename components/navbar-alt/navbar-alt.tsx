import { signOut } from 'firebase/auth';
import Link from 'next/link';
import styled from 'styled-components';
import { db,auth } from '../../firebase/initFirebase'
// import Image from 'next/image';

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
  background-color: #0056D6;
  width: 100%;
  display: flex;
  justify-content: right;
  position: fixed;
  padding: 1px;
`;

export function NavbarAlt(props: NavbarProps) {

  const handleClick = (e:any, path:any) => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("signout successful")
    }).catch((error) => {
      // An error happened.
    });
  };
  
  return (
    <StyledNavbar>
      <Link onClick={(e) => handleClick(e, "/about")} passHref href="../"><Image src="/home.png" alt={''}/></Link>
    </StyledNavbar>
  );
}

export default NavbarAlt;

const NavbarText = styled.p `
  color: black;
  font-weight: bold;
  margin: 10px;
`;
const Image = styled.img `
    width: 20px;
    height: 20px;
    margin: 10px 20px;
`
