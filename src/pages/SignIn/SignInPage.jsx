import { SignIn, useAuth } from "@clerk/clerk-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./SignInPage.module.css";
import { useState } from "react";

const SignInPage = () => {
  const { isSignedIn } = useAuth();
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }
  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/signUp");
    }, 300);
  };

  return (
    <div className={`${styles.signInPage} ${animate ? styles.fadeOut : ""}`}>
      <div className={styles.contentWrapper}>
        <SignIn
          appearance={{
            elements: {
              cardBox: styles.signInCard,
              card: styles.signInCard,
              headerTitle: styles.signInFont,
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
            You don't have an account yet?{" "}
            <span>
              <Link onClick={handleClick}>SIGN UP</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
