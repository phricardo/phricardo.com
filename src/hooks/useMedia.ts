import React from "react";

const useMedia = (media: string): boolean => {
  const [match, setMatch] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(media).matches;
    }
    return false;
  });

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(media);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatch(event.matches);
    };

    setMatch(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [media]);

  return match;
};

export default useMedia;
