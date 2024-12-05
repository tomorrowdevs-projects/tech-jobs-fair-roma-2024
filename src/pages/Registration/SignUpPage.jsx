import { SignUp, useAuth } from "@clerk/clerk-react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/signIn");
    }, 300);
  };

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={`${styles.signUpPage} ${animate ? styles.fadeOut : ""}`}>
      <div className={styles.contentWrapper}>
        <SignUp
          appearance={{
            elements: {
              cardBox: styles.signUpCard,
              card: styles.signUpCard,
              headerTitle: styles.signUpFont,
              headerSubtitle: styles.dNone,
              socialButtonsBlockButton: styles.googleButton,
              socialButtonsProviderIcon: styles.googleIcon,
              socialButtonsBlockButtonText: styles.socialText,
              dividerLine: styles.dNone,
              dividerText: styles.dividerText,
              formFieldInput: styles.formFieldInput,
              formButtonPrimary: styles.formButtonPrimary,
              buttonArrowIcon: styles.dNone,

              footer: styles.dNone,
            },
            variables: {
              colorText: "white",
              fontFamily: "Rubik, sans-serif",
              colorBackground: "#5251b5",
            },
          }}
          redirectUrl="/"
        />

        <div className={styles.footerWrapper}>
          <p className={styles.footerText}>
            ALREADY HAVE AN ACCOUNT?{" "}
            <span>
              <Link onClick={handleClick}>SIGN IN</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
