import React from 'react';
import { useEffect, useRef, useContext, useState } from "react";
import { Helmet } from 'react-helmet'
import Context from '../../context.js';
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js';
import 'jspdf-autotable';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import { PDFDownloadLink, PDFViewer, Page, View, Document, Font } from '@react-pdf/renderer';
// import '../../assets/fonts/arial-unicode-ms.ttf'

// Load the font that supports Vietnamese Unicode characters
Font.register({
  family: 'Arial Unicode MS',
  src: '../../assets/fonts/arial-unicode-ms.ttf',
});

const MyDocument = ({ strhtml }) => {
    // const stringToHTML = (string) => {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(string, 'text/html');
    //     return doc.body.firstChild;
    //   };
    // const [html, setHtml] =useState(null)
    // useEffect(()=>{
    //     setHtml(stringToHTML(strhtml))
    
    // },[])
  return (
    <Document>
      <Page>
        <View style={{ fontFamily: 'Arial Unicode MS' }} dangerouslySetInnerHTML={{ __html: strhtml }} />
      </Page>
    </Document>
  );
};
// import times from '../../assets/fonts/Times-New-Roman/times.ttf'
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
            const url = `http://localhost:8000/api/document/listdocuments/${user._id}`;
            const response = await axios.get(url);
            const documents = response.data;
            console.log(response.data)

            setDocuments(documents);
        }
        fetchData();

    }, [])

    const handleDelete = async (document) => {
        try {
            const url = `http://localhost:8000/api/document/delete/${user._id}/${document.fileName}`;
            const response = await axios.get(url);
            setDocuments((prevDocuments) =>
                prevDocuments.filter((doc) => doc.fileName !== document.fileName)
            );
        }
        catch (error) {
            console.error(error);
        }


    }
    const stringToHTML = (string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(string, 'text/html');
        console.log(doc.body.firstChild)
        console.log(doc)

        return doc.body.firstChild;
      };
      
      const saveAsPDF = () => {
        const element = document.getElementById('ticket');
        console.log(element)
        console.log(typeof element)
        const htmlString = '<div id="ticket"><h1>Hello, co!</h1></div>';
        const htmlElement = stringToHTML(htmlString);
        console.log(htmlElement)
        console.log(typeof htmlElement)

        if (element !== htmlElement){
            console.log(element)
            console.log(htmlElement)

        }
        if (!htmlElement) {
          console.error('Element not found');
          return;
        }
    
        htmlToImage
          .toPng(htmlElement)
          .then(function (dataUrl) {
            var doc = new jsPDF();
            doc.addImage(dataUrl, 'PNG', 15, 40);
            doc.save('minimal.pdf');
          })
          .catch(function (error) {
            console.error('Error:', error);
          });
      };
    
    const saveAsPDFq = () => {
          const htmlString = '<div id="ticket"><h1>Hello, co!</h1></div>';

          // Create a temporary element
          const tempElement = document.createElement('div');
          
          // Set the HTML string as the innerHTML
          tempElement.innerHTML = htmlString;
          
          // Access the child nodes
          const htmlElements = tempElement.childNodes;
          
          // Do something with the HTML elements
          htmlElements.forEach((element) => {
            console.log(element);
            // You can append the element to the DOM or perform any other operations
          });
          console.log(tempElement)
          const htmlElement = stringToHTML(htmlString);
          
        // const htmlContent = '<p>Hello mình là trung đây</p>';
        // const elementToPrint = document.getElementById('navigation');

        htmlToImage.toPng(tempElement)
             .then(function(dataUrl) {
               var doc = new jsPDF();
               doc.addImage(dataUrl, 'PNG', 15, 40);
               doc.save('pension-report' + '.pdf');
             });
      };
      
    const handleDownload = async (document) => {
        const url = `http://localhost:8000/api/document/download/${user._id}/${document.fileName}`;
        const response = await axios.get(url);
        const downloadDocument = response.data;
        console.log(downloadDocument)
        const htmlContent = '<p>Hello mình là trung đây</p>';

        const pdf = new jsPDF();
      
        // Convert HTML to PDF
        html2pdf().from(htmlContent).toPdf().get('pdf').then((pdfDocument) => {
          // Add the PDF pages to the jsPDF instance
          const pages = pdfDocument.getNumPages();
          for (let i = 1; i <= pages; i++) {
            const pageData = pdfDocument.getPageData(i);
            const pageNumber = pdf.addPage([pageData.width, pageData.height]);
            pdf.setPage(pageNumber);
            pdf.addImage(pageData.data, 'JPEG', 0, 0, pageData.width, pageData.height);
          }
      
          // Save the PDF
          pdf.save('document.pdf');
        });
      
        // const pdf = new jsPDF('p', 'pt', 'a4');
        // const parser = new DOMParser();

        // // Parse the HTML string
        // const htmlDocument = parser.parseFromString(htmlString, 'text/html');
        // console.log(htmlDocument)
        // // Access the HTML element
        // const htmlElement = htmlDocument.documentElement;
        // console.log(htmlElement)

        // // Select the element containing the HTML content
    
        // // Convert HTML content to canvas
        // const canvas = await html2canvas(htmlElement);
        // console.log(canvas)
        // // Convert canvas to an image URL
        // const imgData = canvas.toDataURL('image/png');
        // console.log(canvas)

        // // Add the image to the PDF
        // pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        // console.log(canvas)

        // // Save the PDF
        // pdf.save('document.pdf');
    
        // var customFont = {
        //     'TimesNewRoman': {
        //       normal: '../../assets/fonts/Times-New-Roman/times.ttf'
        //     }
        //   };
          
        //   // Register the font
        //   doc.addFont('../../assets/fonts/Times-New-Roman/times.ttf', 'TimesNewRoman', 'normal');
          
          // Register the font
        // doc.addFont('../../assets/fonts/Times-New-Roman/times.ttf', 'TimesNewRoman', 'normal');
        // doc.addFont('../../assets/fonts/Times-New-Roman/times.ttf', 'TimesNewRoman', 'normal');
        // doc.addFont('../../assets/fonts/Times-New-Roman/times.ttf', 'TimesNewRoman', 'normal');
        // doc.addFont('../../assets/fonts/Times-New-Roman/times.ttf', 'TimesNewRoman', 'normal');

        // doc.setFont('times');
        // doc.text('Xin chào thế giới!',15, 15);
        // console.log(doc.getFontList());
        // doc.save(document.fileName + '.pdf');
        // console.log(doc.getFont());
        // doc.html(downloadDocument, {
        //     callback: function (doc) {
        //         // Save the PDF
        //         doc.save(document.fileName + '.pdf');
        //     },
        //     x: 15,
        //     y: 15,
        //     width: 170, //target width in the PDF document
        //     windowWidth: 650 //window width in CSS pixels
        // });
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
                                                            <button class="btn button-success" onClick={saveAsPDF} > Download
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