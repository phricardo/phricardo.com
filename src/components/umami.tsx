import Script from "next/script";

export const UmamiTracker = () => {
  return (
    <Script
      async
      src="https://umami.phricardo.com/script.js"
      data-website-id="0bbe2a2d-23c4-46cf-8663-0c4a3d7218e4"
    />
  );
};
