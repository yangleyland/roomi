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
      <InputContainer>
        <HeaderText>Login to your <BlueText>Roomi</BlueText> Account</HeaderText>
          <FormContainer>
              <Form onSubmit={handleSubmit}>
                  <Input placeholder="enter your email" style={{margin: 5}} ref={emailRef} type="email" id="email" name="email" required/>
                  <Input style={{margin: 5}} placeholder="enter your passcode" ref={passcodeRef} type="password" id="passcode" name="passcode" required/>
                  
                  <GradientButton type="submit">SIGN IN</GradientButton>
                  <p>Don't have an account? <Link style={{color: "blue"}}  passHref href="../create">Create New Account</Link></p>
              </Form>
        </FormContainer>
      </InputContainer>
        
    </StyledLogin>
); 
}

export default Login;
const BlueText=styled.span`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  color: #0056D6;
`

const GradientButton = styled.button`
  width: 150px;
  padding: 0;
  border: none;
  background: linear-gradient(90deg, rgba(151,193,255,1) 0%, rgba(57,130,238,1) 100%);
  color: white;
  border-radius: 0.3rem;
  font-family: Intervariable, sans-serif;
  padding: 10px 15px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 50%;
  font-size: 1.1rem;
  font-weight: bold;
`;

const InputContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 4px solid rgba(255, 255, 255, 0.5);
`



const Input = styled.input`
  border: solid 0.1rem #bcbcbc;
  background-color: #f8f8f8;
  border-radius: 0.3rem;
  padding: 10px;
  padding-left: 15px;
  font-family: InterVariable, sans-serif;
  font-size: 1.1rem;
  color: #676767;
  width: 100%;
  margin-top: 1rem;

  ::placeholder {
    color: #bcbcbc;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #bcbcbc;
  }
`;
const HeaderText = styled.div`
    color: black;
    font-size: 1.5em;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    position: relative;
    top: 30px;
`;
const SubText = styled.div`
    color: grey;
    margin: 10px;
    font-size: 1em;
`;
const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
    top: 60px;
  #submit {
    
  }
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