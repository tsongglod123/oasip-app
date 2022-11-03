import jwt_decode from "jwt-decode";

class TokenService {
  #TOKEN_TYPE = "tokenType";
  #ACCESS_TOKEN = "accessToken";
  #REFRESH_TOKEN = "refreshToken";
  #JSON = "application/json";

  #getTokenType() {
    return localStorage.getItem(this.#TOKEN_TYPE);
  }

  /**
   * Get the access token
   * @returns {string} The access token
   */
  getAccessToken() {
    const accessToken = localStorage.getItem(this.#ACCESS_TOKEN);
    return this.#getTokenType() + " " + accessToken;
  }

  /**
   * Get the refresh token
   * @returns {string} The refresh token
   */
  getRefreshToken() {
    const refreshToken = localStorage.getItem(this.#REFRESH_TOKEN);
    return this.#getTokenType() + " " + refreshToken;
  }

  clearTokens() {
    localStorage.removeItem(this.#TOKEN_TYPE);
    localStorage.removeItem(this.#ACCESS_TOKEN);
    localStorage.removeItem(this.#REFRESH_TOKEN);
  }

  /**
   * Check if the token is expired
   * @param {string} token - The JWT token
   * @returns {boolean} true if token is expired
   */
  isTokenExpired(token) {
    let payload = this.#jwtDecode(token);
    const expiredAt = this.#getExpirationDate(payload);
    const currentDate = Date.now();
    return expiredAt < currentDate;
  }

  /**
   * Decode the token and return the payload data
   * @param {string} token - The JWT token
   * @returns {object} The payload of decoded token
   */
  #jwtDecode(token) {
    let payload = "";
    if (token.startsWith("Bearer ")) {
      let jwtToken = token.substring(7, token.length);
      payload = jwt_decode(jwtToken);
    } else {
      payload = jwt_decode(token);
    }
    return payload;
  }

  /**
   * Get the expiration date from a JWT token
   * @param {object} token - The decoded JWT token
   * @returns {number} The expiration date of the token in milliseconds
   */
  #getExpirationDate(token) {
    return token.exp * 1000;
  }

  /**
   * Save the access token to local storage
   * @param {string} token - The access token
   */
  #setAccessToken(token) {
    localStorage.setItem(this.#ACCESS_TOKEN, token);
  }

  /**
   * Check if the token is stored in the local storage
   * @returns {boolean} true if token is stored
   */
  checkLocalStorage() {
    return (
      localStorage.getItem(this.#ACCESS_TOKEN) !== null &&
      localStorage.getItem(this.#REFRESH_TOKEN) !== null &&
      localStorage.getItem(this.#TOKEN_TYPE) !== null
    );
  }

  async refreshToken() {
    const url = import.meta.env.VITE_BASE_URL + "/v2/auth/token/refresh";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": this.#JSON,
        Authorization: this.getRefreshToken(),
      },
    };
    const res = await fetch(url, options);
    if (res.status === 200) {
      const data = await res.json();
      this.#setAccessToken(data.accessToken);
    } else {
      const body = await res.json();
      alert(body.message);
    }
  }
}

export default new TokenService();
