import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Route, Routes } from "react-router-dom";

import SignUpForm from './pages/signup/signup.js';
import LoginForm from './pages/login/login.js';
import Context from './context.js';
import Home from './pages/Home/home.js'
import Documents from './pages/Documents/Documents.js'

import './App.css';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';

import { Editor } from 'react-draft-wysiwyg';


function App() {
  // const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };
  useEffect(() => {
    initAuthUser();
  }, []);


  return (
    <Context.Provider value={{user, setUser}}>

    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/documents" element={<Documents />} />   

        </Routes>

    </div>
    {/* {isLoading && <Loading />} */}

    </Context.Provider>

  );
}
export default App;