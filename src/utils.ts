export function isInAppBrowser() {
  const ua = navigator.userAgent;
  return (
    ua.includes('FBAN') ||           // Facebook
    ua.includes('FBAV') ||           // Facebook
    ua.includes('Instagram') ||      // Instagram  
    ua.includes('musical_ly') ||     // TikTok
    ua.includes('ByteDanceWebview') || // TikTok
    ua.includes('trill_') ||         // TikTok
    ua.includes('Twitter') ||        // Twitter/X
    ua.includes('LinkedInApp')       // LinkedIn
  );
}

// // Al inicio de tu app
// if (isInAppBrowser()) {
//   showUseRealBrowserMessage();
//   // Bloquear funcionalidades críticas
//   return;
// }