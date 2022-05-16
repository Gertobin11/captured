import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar
      sticky="top"
      className={styles.flexrow}
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <NavLink to="/" className={styles["home-link"]}>
        <Navbar.Brand className={styles["home-link"]}>
          <img
            alt="Green camera on a grey background.jpg"
            src="capture-logo-slategrey-crop.jpg"
            width="35"
            height="35"
            className={`d-inline-block align-top ${styles["brand-img"]}`}
          />{" "}
          CAPTURED | <span className={styles["social-logo"]}>social</span>
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className={styles["basic-navbar-nav"]}
      >
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className={`mr-sm-2 ${styles["form-control"]}`}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <div className={styles["links-section"]}>
          <NavLink exact to="/" activeClassName={styles.active}>
            <i className="fas fa-home"></i> Home
          </NavLink>
          <NavLink to="/sign-in" activeClassName={styles.active}>
            <i className="fas fa-sign-in-alt"></i> Login
          </NavLink>
          <NavLink to="/logout" activeClassName={styles.active}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </NavLink>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
