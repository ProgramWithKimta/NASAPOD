import { jwtDecode } from 'jwt-decode';

interface UserToken {
  data: {
    username: string
  };
  exp: number;
}

class AuthServices {
  login(idToken: string) {
    if(idToken) {
      localStorage.setItem('id_token', idToken);
    }
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  getUsername() {
    const decodedToken = jwtDecode<UserToken>(this.getToken() || '');
    return decodedToken["data"]["username"]
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } 
      
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token') ?? "";
  }
}

export default new AuthServices();