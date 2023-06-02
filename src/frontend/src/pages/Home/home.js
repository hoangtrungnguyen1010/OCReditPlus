import React from 'react';
import DOMPurify from 'dompurify';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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
import {Helmet} from 'react-helmet'
import { EditorState, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from "axios";
import LanSelect from '../../components/LanguageDropdown/LanguageDropdown.js';
import Context from '../../context.js'
import Navigation from '../../components/Naviation/Navigation.js';
import { Editor } from 'react-draft-wysiwyg';
import { jsPDF } from "jspdf";
const Home = () => {
    const {user} = useContext(Context)
    const [selectedFile, setSelectedFile] = useState(null);
    const [lanList, setLanList] = useState([]);
    const [selectedLan, setSelectedLan] = useState([]);
    const [convertedContent, setConvertedContent] = useState(null);
    const Navigate = useNavigate();

    const articleName = useRef(null);

    useEffect(() => {
        const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
        if (!authenticatedUser) {
          Navigate('/login');
        }
      }, []);
  
    useEffect(()=>{
        async function fetchData(){
        const url = "http://localhost:8000/api/documents/lanlist";

        const res =  await axios.get(url);

        setLanList(res.data.lan)
        console.log(res.data.lan)
        }
        fetchData();
    }, [])

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };

    const handleLanChange = (lan)=>{
        setSelectedLan(lan);
    }
  
    const handleOCR = async() => {
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('lan', selectedLan);

            if (selectedFile) {
                const url = "http://localhost:8000/api/documents/ocrtotext";
                const res =  await axios.post(url, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });

                console.log(res.data.resultText);
                handleEditorChange(res.data.resultText);

            }
        }
        catch(error) {
            console.error('Error uploading file:', error);
        }
    };
  
    const handleEditorChange = (newContent) => {
        console.log(newContent)

        const newContentState = ContentState.createFromText(String(newContent));
        // const convertedState = convertFromRaw(JSON.parse(newEditorState))
        const editorState = EditorState.createWithContent(newContentState);
        
        setEditorState(editorState);

      };
    
    const handleSubmit = async()=>{
        // console.log(convertedContent)
        // if(convertedContent){

        console.log('success')
        console.log(user)
        console.log(user._id)
        console.log(articleName.current.value)


        const url = "http://localhost:8000/api/document/save";
        const res =  await axios.post(url, {user_uid: user._id, fileName: articleName.current.value, content:  convertedContent});
        if (res){
            console.log('success')
        }

    }
    function createMarkup(html) {
        console.log("hello")
        return {
          __html: DOMPurify.sanitize(html)
        }
      }
    
    const handleDownload = async()=>{
        
        const element = document.getElementById('previewText');
        console.log(element)
        htmlToImage
          .toPng(element)
          .then(function (dataUrl) {
            var doc = new jsPDF();
            doc.addImage(dataUrl, 'PNG', 15, 40);
            doc.save('minimal.pdf');
          })
          .catch(function (error) {
            console.error('Error:', error);
          });
      };
    
    const handleReset = ()=>{
        setEditorState(EditorState.createEmpty());
    }
    const handleToArticle = ()=>{
        Navigate('/documents');
    }
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
    
    useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    }, [editorState]);


return(
    <div class="wrapper ">
        <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet"/>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet"/>
        {/* <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script> */}

        {/* <script src='../../assets/js/core/jquery.min.js'>
        <script src="../../assets/js/core/jquery.min.js"></script> */}
        {/* <script src="../assets/js/core/popper.min.js"></script>
        <script src="../assets/js/core/bootstrap.min.js"></script>
        <script src="../assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
        <script src="../assets/js/plugins/chartjs.min.js"></script>
        <script src="../assets/js/plugins/bootstrap-notify.js"></script>
        <script src="../assets/js/paper-dashboard.min.js?v=2.0.1" type="text/javascript"></script>
        <script src="../assets/demo/demo.js"></script>
        <script src="../assets/js/upload.js"></script>
        <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script> */}

        </Helmet>
        <div class="sidebar" data-color="white" data-active-color="danger">
            <div class="logo">
                <a href="https://www.creative-tim.com" class="simple-text logo-mini">
                    <div class="logo-image-small">
                        <img src="../assets/img/default-avatar.png"/>
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
                {/* <ul class="nav">
                    <li class="active ">
                        <a href="./index.html">
                            <i class="nc-icon nc-bank"></i>
                            <p>Dashboard</p>
                        </a>
                    </li>
                    <li>
                        <a onClick={handleToArticle}>
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
                                <input type="text" value="" class="form-control" placeholder="Search..."/>
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
                        <div class="bg-light p-5">
                            <div class="row">
                                <div class="col-md-12 center">
                                    <h1 class="font-weight-bold">New article</h1>
                                    <p>Content from image will be automatically detected below</p>
                                    <input type="file" onChange={handleFileChange} />
                                </div>
                            </div>

                            <div class="row center">
                                <div class="col-lg-12">
                                    <button class="btn btn-success mx-auto" onClick={handleOCR} >Detect</button>
                                    <LanSelect lanList={lanList} onSelectLan={handleLanChange} />

                                </div>
                                <div class="col-lg-12">
                                    <i class="nc-icon nc-minimal-down"></i>
                                </div>
                            </div>

                            <div class="card card-user">
                                <div class="card-header">
                                    <h5 class="card-title">New article</h5>
                                </div>

                                <div class="card-body">
                                    {/* <form> */}
                                        <div class="form-group">
                                            <label for="name" class="font-weight-bold">Article name <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="name"
                                                placeholder="Please input article name" ref = {articleName}/>

                                        </div>
                                        <div class="form-group">
                                            <label for="editor" class="font-weight-bold">Content <span class="text-danger">*</span></label>
                                            <div>
                                            </div>
                                            <Editor placeholder="Please detect text from image source"
                                                editorState={editorState}
                                                onEditorStateChange={setEditorState}
                                                wrapperClassName="wrapper-class"
                                                editorClassName="editor-class"
                                                toolbarClassName="horizontal-toolbar"
                                                />

                                            {/* <textarea id="editor" name="content" placeholder="Please detect text from image source">Please detect text from image source ...</textarea> */}
                                        </div>

                                        <button type="submit" class="btn btn-primary" onClick={handleSubmit} >Save</button>
                                        <button type="download" class="btn btn-primary" onClick={handleDownload} >Download</button>

                                        <button type="reset" class="btn btn-warning"onClick={handleReset} >Reset</button>
                                    {/* </form> */}
                                    <div
                                        className="preview" id = 'previewText'
                                        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
                                    </div>
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

export default Home;