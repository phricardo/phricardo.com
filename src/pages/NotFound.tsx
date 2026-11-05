import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className={`${styles.page} flex items-center justify-center`}>
      <div className={`${styles.panel} px-6 py-8 text-center`}>
        <h1 className={`${styles.code} mb-4 text-4xl`}>404</h1>
        <p className={`${styles.message} mb-4 text-xl`}>Oops! Page not found</p>
        <a href="/" className={`${styles.link} underline`}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
