import React from "react";
import ksbLogo from "../assets/ksb.jpg.png";

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.leftGroup}>
        <div style={styles.logo}>
          <img
            // src={ksbLogo}
            // alt="KSB Logo"
            style={{ height: 40, paddingLeft: 20 }}
          />
        </div>
        <div style={styles.leftIcons}>
          <span title="Menu" style={styles.icon}>
            ☰
          </span>
          <span title="Grid" style={styles.icon}>
            ▦
          </span>
          <span title="Login" style={styles.icon}>
            ⎆
          </span>
        </div>
      </div>

      <div style={styles.rightIcon}>
        <span title="Fullscreen" style={styles.icon}>
          ⛶
        </span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#08549c",
    color: "white",
    padding: "9px 13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Arial, sans-serif",
  },
  leftGroup: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: "bold",
  },
  //   delta: {
  //     fontSize: "26px",
  //     paddingLeft:"0px",
  //   },
  //   logoText: {
  //     fontSize: "22px",
  //   },
  leftIcons: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    fontSize: "22px",
    cursor: "pointer",
    paddingLeft: "55px",
  },
  rightIcon: {
    fontSize: "22px",
    cursor: "pointer",
  },
  icon: {
    userSelect: "none",
  },
};

export default Header;
