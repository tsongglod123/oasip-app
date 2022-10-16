class TokenService {
  #TOKEN_TYPE = "tokenType";
  #ACCESS_TOKEN = "accessToken";
  #REFRESH_TOKEN = "refreshToken";

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
    // 0 = header (algorithm & token type)
    // 1 = payload (data)
    // 2 = verify signature
    let payload = token.split(".")[1];
    let data = Buffer.from(payload, "base64").toString("ascii");
    return JSON.parse(data);
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
}

export default new TokenService();
