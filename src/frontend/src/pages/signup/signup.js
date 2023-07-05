import React from 'react';
import { useRef, useContext, useEffect } from "react";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Context from '../../context.js'
import '../../assets/css/login.css'

const SignUpForm = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
    if (authenticatedUser) {
      Navigate('/');
    }
  }, [Navigate]);


    // const {setIsLoading } = useContext(Context);
  
    const fullnameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
  
    const getInputs = () => {
      const fullname = fullnameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      return { fullname, email, password, confirmPassword };
    };
  
    const isSignupValid = ({ fullname, email, password, confirmPassword }) => {
      if (validator.isEmpty(fullname)) {
        alert("Please input your fullname");
        return false;
      }
      if (!validator.isEmail(email)) {
        alert("Please input your email");
        return false;
      }
      if (
        validator.isEmpty(password) ||
        !validator.isLength(password, { min: 6 })
      ) {
        alert(
          "Please input your password. You password must have at least 6 characters"
        );
        return false;
      }
      if (validator.isEmpty(confirmPassword)) {
        alert("Please input your confirm password");
        return false;
      }
      if (password !== confirmPassword) {
        alert("Confirm password and password must be the same");
        return false;
      }
      return true;
    };
  
    const createUser = async ({ id, email, password, fullname, avatar }) => {
      const url = "http://localhost:8080/api/users";
  
      return await axios.post(url, {uid:id,  name: fullname, email: email, password: password, avatar: avatar});
  
    };
  
  
    const generateAvatar = () => {
      const avatars = [
        "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png",
        "https://data-us.cometchat.io/assets/images/avatars/cyclops.png",
        "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
        "https://data-us.cometchat.io/assets/images/avatars/spiderman.png",
        "https://data-us.cometchat.io/assets/images/avatars/wolverine.png",
      ];
      const avatarPosition = Math.floor(Math.random() * avatars.length);
      return avatars[avatarPosition];
    };
  
    const toLogin = ()=>{
      Navigate('/login');

    }
    const signup = async () => {
  
      const { fullname, email, password, confirmPassword } = getInputs();
  
      if (isSignupValid({ fullname, email, password, confirmPassword })) {
        // setIsLoading(true);
        const avatar = generateAvatar();
        const id = uuidv4();
  
        const response = await createUser({
          id,
          email,
          password,
          fullname,
          avatar,
        });
        if (response && response.data.message) {
          alert(response.data.message);
        } else {
          console.log("account created")
        }
        toggleModal(false);
        // setIsLoading(false);
        Navigate('/');

      }
    };
  return (
    <section className="login-block">
      <div className="container">
        <div className="row">
          <div className="col-md-4 login-sec">
            <h2 className="text-center">Sign Up Now</h2>
            <form className="login-form">
                <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input type="text" className="form-control" id="fullname" placeholder="Nguyen Van A" ref={fullnameRef} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Email" ref={emailRef} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" ref={passwordRef} />
              </div>
              <div className="form-group">
                <label htmlFor="retype-password">Retype password</label>
                <input type="password" className="form-control" id="retype-password" placeholder="Password" ref={confirmPasswordRef} />
              </div>

              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                  Already have an account? <button onClick={toLogin} className="ml-2">Login</button>
                </div>
              </div>

              <div className="form-check mt-3">
                <button type="submit" className="btn btn-login float-right" onClick={signup}>Sign Up</button>
              </div>

            </form>
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

export default SignUpForm;
