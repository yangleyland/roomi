import Link from 'next/link';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
  background-color: #0056D6;
  width: 100%;
  display: flex;
  justify-content: right;
  position: fixed;

`;

export function Navbar(props: NavbarProps) {
  return (
    <StyledNavbar>
      <NavbarText>
      <Link passHref href="./signin">
      Log in / Sign up
        </Link></NavbarText>
    </StyledNavbar>
  );
}

export default Navbar;

const NavbarText = styled.p `
  color: black;
  font-weight: bold;
  margin: 10px 20px 10px 10px;
  a {
    color: white;
  }
`;
