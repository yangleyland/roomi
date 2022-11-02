import styled from 'styled-components';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function Login(props: LoginProps) {
  return(
    <StyledLogin>
        <HeaderText>Login</HeaderText>
        <FormContainer>
            <Form>
                <label style={{margin: 5}} htmlFor="URLfrom">Group ID:</label>
                <input style={{margin: 5}} type="text" id="URLfrom" name="URLfrom" />
                
                <input style={{margin: 5, width: 90}} type="submit" id="submit" />
                <p>Don't have an account? <Link style={{color: "blue"}}  passHref href="../create">Create New Account</Link></p>
            </Form>
      </FormContainer>
    </StyledLogin>
); 
}

export default Login;
const HeaderText = styled.div`
    color: black;
    font-size: 2em;
    margin: 10px;
`;
const SubText = styled.div`
    color: grey;
    margin: 10px;
    font-size: 1em;
`;
const FormContainer = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
`;
const Form = styled.form`
  position: relative;
  bottom: 10%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

`;