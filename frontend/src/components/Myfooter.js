import "./Myfooter.css";
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;


function Myfooter() {
    return (
        <div className = "main-footer">
            <div className = "footer-content">
                <div className = "footer-section col1">
                     <h2>MEMES</h2>   
                     <ul className = "list-unstyled">
                            <li>ant</li>
                            <li>git</li>
                            <li>nodejs</li>
                            <li>sublime</li>
                            <li>stackoverflow</li>
                            <li>youtube</li>
                        </ul>
                </div>
                <div className = "footer-section col2">
                    <h2>SOME STUFF</h2>
                        <ul className = "list-unstyled">
                            <li>ABC</li>
                            <li>DEF</li>
                            <li>EFG</li>
                            <li>IUHDFID</li>
                        </ul>
                </div>
                <div className = "footer-section col3">
                    <h2>OTHER STUFF</h2>
                        <ul className = "list-unstyled">
                            <li>ABC</li>
                            <li>DEF</li>
                            <li>EFG</li>
                            <li>IUHDFID</li>
                        </ul>
                </div>
            </div>    
            <hr />
            <div className = "footer-bottom">
                &copy; {new Date().getFullYear} Trường Đại học Công nghệ, Đại học Quốc Gia Hà Nội
            </div>
        </div>
    );
}

export {Myfooter};