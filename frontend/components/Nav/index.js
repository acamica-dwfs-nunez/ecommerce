import React, { Component } from "react";
import Link from "next/link";
import styles from "./nav.module.scss";

class Nav extends Component {
  render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.logo} />
            <input type="text" />
          </div>

          <div className={styles.right}>
            <ul>
              {["Categories", "Hot", "Contact", "About Us"].map(t => (
                <li>
                  <Link>
                    <a href="">{t}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
