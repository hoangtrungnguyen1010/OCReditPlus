import React from 'react';
import { useEffect, useRef, useContext } from "react";
import validator from "validator";
import { useNavigate } from 'react-router-dom';
import Context from '../../context.js'
import axios from 'axios';
import '../../assets/css/login.css'

const LoginForm = () => {

    const { user, setUser } = useContext(Context);
  
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
  
    const Navigate = useNavigate();
  
    useEffect(() => {
      const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
      if (authenticatedUser) {
        Navigate('/');
      }
    }, [Navigate]);
  
    const getInputs = () => {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      return { email, password };
    };
  
    const isUserCredentialsValid = (email, password) => {
      return validator.isEmail(email) && password;
    };
  
    const signin = async (email, password) => {
      const url = "http://localhost:8080/api/users/login";
      return await axios.post(url, { email: email, password: password });
    }
    
    const toSignUpPage= () =>{
        Navigate('/signup');
    }

    const login = async() => {
      const { email, password } = getInputs();
      console.log(getInputs())
      if (isUserCredentialsValid(email, password)) {
        console.log("yes")
        try {
          // setIsLoading(true);
          const authenticatedUser = await signin(email, password);
          if (authenticatedUser){
            localStorage.setItem('auth', JSON.stringify(authenticatedUser.data));
            console.log(authenticatedUser.data)

            setUser(authenticatedUser.data);
            // setIsLoading(false);
            console.log(user)
            Navigate('/');
          }
  
        } catch (error) {
          console.log(error);
          alert('Failure to log in, please try again');
          // setIsLoading(false);
        }
      }
    };
  return (

    <section className="login-block">
      <div className="container">
        <div className="row">
          <div className="col-md-4 login-sec">
            <h2 className="text-center">Login Now</h2>
            {/* <form className="login-form"> */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Email" ref = {emailRef}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" ref = {passwordRef}/>
              </div>

              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                  Don't have an account? <a onClick={toSignUpPage} className="ml-2">Sign Up</a>
                </div>
                <div className="d-flex justify-content-center links">
                  <a href="#">Forgot your password?</a>
                </div>
              </div>

              <div className="form-check">
                <button type="submit" className="btn btn-login float-right" onClick={login}>Login</button>
              </div>

            {/* </form> */}
          </div>
          <div className="col-md-8 banner-sec">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  <img className="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="First slide" />
                  <div className="carousel-caption d-none d-md-block">
                    <div className="banner-text">
                      <h2>Image Scanner</h2>
                      <p>Scan your book, paper image, screenshots, ...</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img className="d-block img-fluid" src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg" alt="First slide" />
                  <div className="carousel-caption d-none d-md-block">
                    <div className="banner-text">
                      <h2>Image Scanner</h2>
                      <p>Quick, robust, convenience</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img className="d-block img-fluid" src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg" alt="First slide" />
                  <div className="carousel-caption d-none d-md-block">
                    <div className="banner-text">
                      <h2>Image Scanner</h2>
                      <p>Best tool to cover your information and store cloud.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
