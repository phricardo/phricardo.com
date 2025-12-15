import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-github-dark text-github-text">
      <div className="text-center bg-[#121212] border border-[#212121] rounded-lg px-6 py-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-github-text mb-4">Oops! Page not found</p>
        <a href="/" className="text-[#34eb64] hover:text-[#34eb64]/80 underline font-medium">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
