import React from "react";
import "./footer.css";


const Footer = () => {
    return (
        <div className="footer-main">
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Our Services</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Get Help</h4>
                            <ul>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Shipping</a></li>
                                <li><a href="#">Returns</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Contact Us</h4>
                            <ul>
                                <li><a href="#">+123 456 789</a></li>
                                <li><a href="#">contact@example.com</a></li>
                                <li><a href="#">Location</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Follow us</h4>
                            <div className="social-links">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;