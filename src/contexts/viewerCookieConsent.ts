import { createContext } from "react";

export const VIEWER_COOKIE_OPT_IN_KEY = "viewer_cookie_opt_in";
export const ACCEPTED_VALUE = "true";

export interface ViewerCookieConsentContextValue {
  hasAcceptedViewerCookies: boolean;
  isViewerCookieReady: boolean;
  acceptViewerCookies: () => Promise<void>;
}

export const ViewerCookieConsentContext =
  createContext<ViewerCookieConsentContextValue | null>(null);

export const hasStoredViewerCookieConsent = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(VIEWER_COOKIE_OPT_IN_KEY) === ACCEPTED_VALUE;
};
