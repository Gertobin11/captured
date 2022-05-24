import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import logo from '../assets/capture-logo-slategrey-crop.jpg'


const NavBar = () => {

  const {expanded, setExpanded, ref} = useClickOutsideToggle();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async (e) => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <div className={`${styles["links-section"]}`}>
      <NavLink to="/posts/create/" activeClassName={styles.active}>
        <i className="far fa-plus-square"></i> Create Post
      </NavLink>
    </div>
  );

  const loggedOutUsersNav = (
    <>
      <NavLink to="/sign-up" activeClassName={styles.active}>
        <i className="fas fa-user-plus"></i> Sign Up
      </NavLink>
      <NavLink to="/sign-in" activeClassName={styles.active}>
        <i className="fas fa-sign-in-alt"></i> Login
      </NavLink>
    </>
  );
  const loggedInUsersNav = (
    <>
      <NavLink to={`/profiles/${currentUser?.profile_id}`}>
        <Avatar
          src={currentUser?.profile_image}
          text="Profile"
          height={40}
          activeClassName={styles.active}
        />
      </NavLink>
      <NavLink to="/feed" activeClassName={styles.active}>
        <i className="fas fa-stream"></i> Feed
      </NavLink>
      <NavLink to="/liked" activeClassName={styles.active}>
        <i className="fas fa-heart"></i> Liked
      </NavLink>
      <NavLink to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </NavLink>
    </>
  );


  return (
    <Navbar
      expanded={expanded}
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
            src={logo}
            width="35"
            height="35"
            className={`d-inline-block align-top ${styles["brand-img"]}`}
          />{" "}
          CAPTURED | <span className={styles["social-logo"]}>social</span>
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle
        ref={ref}
        onClick={() => setExpanded(!expanded)}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className={styles["basic-navbar-nav"]}
      >
        {currentUser ? (
          addPostIcon
        ) : (
          <div className={`${styles["links-section"]}`}>Log in to Post </div>
        )}
        <div className={styles["links-section"]}>
          {currentUser ? loggedInUsersNav : loggedOutUsersNav}
          <NavLink exact to="/" activeClassName={styles.active}>
            <i className="fas fa-home"></i> Home
          </NavLink>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
