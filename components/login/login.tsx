import styled from 'styled-components';
import Link from 'next/link';
import { useRef } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/initFirebase.js"
import router from 'next/router.js';

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(89,139,213,1) 100%);

  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function Login(props: LoginProps) {
  const emailRef = useRef<any>(null);
  const passcodeRef = useRef<any>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (emailRef.current!=null && passcodeRef!=null){
      signInWithEmailAndPassword(auth, emailRef.current.value, passcodeRef.current.value)
      .then((userCredential) => {
        // Signed in 
        console.log("you are signed in")
        router.push("../main-page");
        // ...
      })
      .catch((error) => {
        console.log("failure")
        // ..
      });
    }

  };


  return(
    <StyledLogin>
        <HeaderText>Login</HeaderText>
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <label style={{margin: 5}} htmlFor="email">Email:</label>
                <input style={{margin: 5}} ref={emailRef} type="email" id="email" name="email" required/>
                <label style={{margin: 5}} htmlFor="passcode">Passcode:</label>
                <input style={{margin: 5}} ref={passcodeRef} type="password" id="passcode" name="passcode" required/>
                
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