import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import styles from "../component/MyNav.module.css";
import logo from "../assets/logo.svg";

const MyNav = () => {
  const { isSignedIn, user } = useUser();
  return (
    <>
      <Navbar className={`${styles.navBar} py-0`}>
        <Container>
          <Navbar.Brand className={`${styles.brand}`}>
            <img src={logo} alt="RitmoGiornaliero Logo" className={`${styles.logo}`} />
            <span className={styles.appName}>RitmoGiornaliero</span>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Dropdown autoClose="outside">
                <Dropdown.Toggle variant="btn" id="dropdown-autoclose-outside" className={`${styles.noCaret} ${styles.userToggle}`}>
                  {isSignedIn && (
                    <div className={styles.userInfo}>
                      <img src={user.imageUrl} alt="" className={`${styles.imgProfile} mt-3 rounded-circle`} />
                      <div className={`${styles.navText} mt-3`}>Hello, {user.firstName}</div>
                    </div>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className={`${styles.navBar} ${styles.narrowDropdown}`}>
                  <Dropdown.Item className={`${styles.navBar}`}>
                    <SignOutButton>
                      <span className={`${styles.navText} py-3 m-0`}>Sign out</span>
                    </SignOutButton>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNav;
