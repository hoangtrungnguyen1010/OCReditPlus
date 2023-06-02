import React from 'react';
import { useEffect, useRef, useContext, useState } from "react";
// import validator from "validator";
import { useNavigate, NavLink } from 'react-router-dom';
// import Context from '../../context.js'
import './home.css'
import '../../assets/css/login.css'
import '../../assets/css/style.css'
import '../../assets/demo/demo.css'
import "../../assets/css/bootstrap.min.css"
import "../../assets/css/paper-dashboard.css"
import { Helmet } from 'react-helmet'
import { EditorState, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from "axios";
import LanSelect from '../../components/LanguageDropdown/LanguageDropdown.js';
import Context from '../../context.js'

import { Editor } from 'react-draft-wysiwyg';
const Navigation = () => {
    const Navigate = useNavigate();

    const handleToDashboard = ()=>{
        Navigate('/')
    }

    const handleToFiles = ()=>{
        Navigate('/Documents')
    }

    const handleToProfile = ()=>{
        Navigate('/Profile')
    }


    return (
        <div>
            <Helmet>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet" />
                <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
                <link href="../assets/css/paper-dashboard.css?v=2.0.1" rel="stylesheet" />
                <link href="../assets/demo/demo.css" rel="stylesheet" />
                <link href="../assets/css/style.css" rel="stylesheet" />

            </Helmet>
            <div class="sidebar" data-color="white" data-active-color="danger">
                <div class="logo">
                    <a href="https://www.creative-tim.com" class="simple-text logo-mini">
                        <div class="logo-image-small">
                            <img src="../assets/img/default-avatar.png" />
                        </div>
                    </a>
                    <a href="#" class="simple-text logo-normal">
                        Image Scanner
                    </a>
                </div>
                <div class="sidebar-wrapper">
                    <ul class="nav">
                        <li class="active ">
                            <a href="./index.html">
                                <i class="nc-icon nc-bank"></i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li>
                            <a href="./articles.html">
                                <i class="nc-icon nc-tile-56"></i>
                                <p>Articles</p>
                            </a>
                        </li>
                        <li>
                            <a href="./profile.html">
                                <i class="nc-icon nc-single-02"></i>
                                <p>Profile</p>
                            </a>
                        </li>
                    </ul>

                    {/* <ul class="nav">
                        <li>
                            <NavLink exact to="/" activeClassName="active">
                                <i class="nc-icon nc-bank"></i>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/documents" activeClassName="active">
                                <i class="nc-icon nc-tile-56"></i>
                                <p>Files</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" activeClassName="active">
                                <i class="nc-icon nc-single-02"></i>
                                <p>Profile</p>
                            </NavLink>
                        </li>
                    </ul> */}
                </div>
            </div>

            <div class="main-panel">
                <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
                    <div class="container-fluid">
                        <div class="navbar-wrapper">
                            <div class="navbar-toggle">
                                <button type="button" class="navbar-toggler">
                                    <span class="navbar-toggler-bar bar1"></span>
                                    <span class="navbar-toggler-bar bar2"></span>
                                    <span class="navbar-toggler-bar bar3"></span>
                                </button>
                            </div>
                            <a class="navbar-brand" href="javascript:;">Scan your image</a>
                        </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-bar navbar-kebab"></span>
                            <span class="navbar-toggler-bar navbar-kebab"></span>
                            <span class="navbar-toggler-bar navbar-kebab"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navigation">
                            <form>
                                <div class="input-group no-border">
                                    <input type="text" value="" class="form-control" placeholder="Search..." />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <i class="nc-icon nc-zoom-split"></i>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <ul class="navbar-nav">
                                <li class="nav-item btn-rotate dropdown">
                                    <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="nc-icon nc-circle-10"></i>
                                        <p>
                                            <span class="d-lg-none d-md-block">Some Actions</span>
                                        </p>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <a class="dropdown-item" href="./profile.html">Profile</a>
                                        <a class="dropdown-item" href="./login.html">Login</a>
                                        <a class="dropdown-item" href="./signup.html">Signup</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
)}

export default Navigation;