import Link from 'next/link';
import styled from 'styled-components';
// import Image from 'next/image';

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
  background-color: #d9d9d9;
  width: 100%;
  display: flex;
  justify-content: right;
  position: fixed;
  padding: 1px;
`;

export function NavbarAlt(props: NavbarProps) {
  return (
    <StyledNavbar>
      <Link passHref href="../main-page"><Image src="/home.png" alt={''}/></Link>
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
