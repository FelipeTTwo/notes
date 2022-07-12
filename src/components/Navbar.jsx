import styles from "../styles/navbar.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [sider, setSider] = useState(false);
  const logout = async () => {
    try {
      const URI = "https://notes-ensolvers.herokuapp.com/logout";
      await axios({
        method: "get",
        url: URI,
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles.body}`}>
      <nav className={``}>
        <div className={`${styles.navbar}`}>
          <div className={`${styles.logo}`}>&#60;Notes /&#62;</div>
          <ul
            className={
              sider ? `${styles.menu} ${styles.active}` : `${styles.menu} $`
            }
          >
            <li>
              <Link to="/dashboard">Notes</Link>
            </li>
            <li>
              <Link to="/dashboard/archived">Archived</Link>
            </li>

            <li></li>

            <div className={`${styles["cancel-btn"]}`}>
              <FontAwesomeIcon icon={faXmark} onClick={() => setSider(false)} />
            </div>
          </ul>
          <div className={`${styles["media-icons"]}`}>
            <p>
              <FontAwesomeIcon icon={faComment} />
            </p>
            <p>
              <a href="/">
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className={styles.logout}
                  onClick={logout}
                />
              </a>
            </p>
          </div>
        </div>
        <div
          className={
            sider
              ? `${styles["menu-btn"]} ${styles["open"]}`
              : `${styles["menu-btn"]}`
          }
        >
          <FontAwesomeIcon icon={faBars} onClick={() => setSider(true)} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
