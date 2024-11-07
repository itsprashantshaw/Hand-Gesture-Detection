import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Hand Gesture Detection</p>
      <div className="footer-links">
        <a href="/privacy" className="footer-link">Privacy Policy</a>
        <a href="/terms" className="footer-link">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
