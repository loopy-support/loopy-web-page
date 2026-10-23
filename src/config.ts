// Set to the real App Store link when the app is live; CTAs switch to a download link.
export const APP_STORE_URL: string | null = null;

// Public address of this site; links shared or indexed point here, not to other Loopy sites.
export const SITE_URL = "https://loopy-support.github.io/loopy-web-page";

export const pageUrl = (path: string) => SITE_URL + (path === "/" ? "/" : `${path}/`);
