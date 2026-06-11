
import * as CryptoJS from 'crypto-js';

export class SecretUtilities {
  private readonly SHARED_KEY_AES = process.env.SHARED_KEY_AES || '';
  private readonly ENCRYPT_KEY = process.env.ENCRYPT_KEY || '';
  private readonly ENCRYPT_KEY2 = process.env.ENCRYPT_KEY2 || '';
  private readonly SECRET_KEY = process.env.SECRET_KEY || '';

  encrypt(password: string) {

    if (!password.length) return password

    const aes = CryptoJS.AES.encrypt(password, CryptoJS.HmacSHA256(this.ENCRYPT_KEY, this.SECRET_KEY).toString(CryptoJS.enc.Base64));
    const tripleDES = CryptoJS.TripleDES.encrypt(aes.toString(), CryptoJS.HmacSHA256(this.ENCRYPT_KEY2, this.SECRET_KEY).toString(CryptoJS.enc.Base64));
    return tripleDES.toString();
  }

  decrypt(password: string): string {
    if (!password.length) return password

    const tripleDESKey = CryptoJS.HmacSHA256(this.ENCRYPT_KEY2, this.SECRET_KEY).toString(CryptoJS.enc.Base64);
    const tripleDES = CryptoJS.TripleDES.decrypt(password, tripleDESKey).toString(CryptoJS.enc.Utf8);

    const aesKey = CryptoJS.HmacSHA256(this.ENCRYPT_KEY, this.SECRET_KEY).toString(CryptoJS.enc.Base64);
    const aes = CryptoJS.AES.decrypt(tripleDES, aesKey).toString(CryptoJS.enc.Utf8);

    return aes;
  }

  decryptPwd(password: string) {
    if (!password.length) return password

    const aes = CryptoJS.AES.decrypt(password, this.SHARED_KEY_AES).toString(CryptoJS.enc.Utf8)

    return aes
  }

  encryptPwd(password: string) {
    if (!password.length) return password
    const aes = CryptoJS.AES.encrypt(password, this.SHARED_KEY_AES).toString();
    return aes.toString();
  }
}
