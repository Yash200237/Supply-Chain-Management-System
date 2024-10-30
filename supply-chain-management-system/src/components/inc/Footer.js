import React from "react";

function Footer() {
  return (
    <footer 
      style={{ 
        backgroundColor: '#757575', // Gray color for a neutral, subtle look
        color: '#FFFFFF',            // White text for contrast and readability
        textAlign: 'center', 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "60px", 
        width: "100%" 
      }}
    >
      <p style={{ margin: 0 }}>© 2024 SmartDelivery. All rights reserved.</p>
    </footer>
  );
}

export default Footer;