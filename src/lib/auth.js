// lib/auth.js
import Cookies from "js-cookie";

export function getAuthToken() {
  return Cookies.get("token");
}

// For server-side, we need a different approach
export function getTokenFromRequest(request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [name, ...value] = cookie.trim().split('=');
      return [name, value.join('=')];
    })
  );
  
  return cookies.token || null;
}