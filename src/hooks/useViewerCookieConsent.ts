import { useContext } from "react";
import { ViewerCookieConsentContext } from "@/contexts/viewerCookieConsent";

export const useViewerCookieConsent = () => {
  const context = useContext(ViewerCookieConsentContext);

  if (!context) {
    throw new Error(
      "useViewerCookieConsent must be used within ViewerCookieConsentProvider"
    );
  }

  return context;
};
