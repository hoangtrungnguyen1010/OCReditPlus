import React from 'react';
import { useEffect, useRef, useContext, useState } from "react";
import { Helmet } from 'react-helmet'
import Context from '../../context.js';
import axios from "axios";

import { useNavigate, NavLink } from 'react-router-dom';
const Documents = () => {
    const { user } = useContext(Context);
    const Navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
        if (!authenticatedUser) {
            Navigate('/login');
        }
    }, [Navigate]);


    useEffect(() => {
        console.log("hihi")
        console.log(user._id)

        async function fetchData() {
            const url = `http://localhost:8080/api/document/listdocuments/${user._id}`;
            const response = await axios.get(url);
            const documents = response.data;
            console.log(response.data)

            setDocuments(documents);
        }
        fetchData();

    }, [])

    const handleDelete = async (document) => {
        try {
            const url = `http://localhost:8080/api/document/delete`;
            const res =  await axios.post(url, {user_uid: user._id, fileName: document.fileName})

            setDocuments((prevDocuments) =>
                prevDocuments.filter((doc) => doc.fileName !== document.fileName)
            );
        }
        catch (error) {
            console.error(error);
        }


    }

      
    const handleDownload = async () => {}

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
                        <li> 
                            <NavLink exact to="/" activeClassName="active">
                                <i class="nc-icon nc-bank"></i>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/documents" activeClassName="active">
                                <i class="nc-icon nc-tile-56"></i>
                                <p>Files</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/profile" activeClassName="active">
                                <i class="nc-icon nc-single-02"></i>
                                <p>Profile</p>
                            </NavLink>
                        </li>
                    </ul> 
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
                <div class="content">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Articles</h4>
                                    <p>Scanned from images</p>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <a class="btn btn-success" href="./add-article.html">New article</a>
                                        <table class="table">
                                            <thead class=" text-primary">
                                                <th class="w-50">
                                                    Name
                                                </th>
                                                <th class="w-25">
                                                    Image
                                                </th>
                                                <th class="w-25">
                                                    #
                                                </th>
                                            </thead>

                                            <tbody>
                                                {documents && documents.map(document => (

                                                    <tr>
                                                        <td>
                                                            <a href="article-detail.html">{document.fileName}</a>
                                                        </td>

                                                        <td>
                                                        
                                                        {/* <PDFViewer>
                                                            <MyDocument html={stringToHTML(document.content)} />
                                                        </PDFViewer> */}
                                                        </td>
                                                        <td>
                                                            <button class="btn btn-warning">Update</button>
                                                            <button class="btn btn-danger" onClick={() => handleDelete(document)}>Delete</button>
                                                            <button class="btn button-success" onClick={handleDownload} > Download
                                                            {/* <PDFDownloadLink document={<MyDocument html={document.content} />} fileName="document.pdf">
                                                                {({ blob, url, loading, error }) =>{
                                                                    if (!loading) {
                                                                    this.download(filename, URL.createObjectURL(blob));
                                                                    callback();
                                                                    }
                                                                }
                                                                    // loading ? 'Loading document...' : 'Download now!'
                                                                    
                                                                }
                                                            </PDFDownloadLink> */}

                                                            </button>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="footer footer-black  footer-white ">
                    <div class="container-fluid">
                        <div class="row">
                            <nav class="footer-nav">
                                <ul>
                                    <li><a href="#" target="_blank">TKPM 20</a></li>
                                    <li><a href="#" target="_blank">CNTN</a></li>
                                    <li><a href="#" target="_blank">@mhneh</a></li>
                                </ul>
                            </nav>
                            <div class="credits ml-auto">
                                <span class="copyright">
                                    © <script>
                                        document.write(new Date().getFullYear())
                                    </script>, made with <i class="fa fa-heart heart"></i> by mhneh
                                </span>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    )
};

export default Documents;