import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/shared/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private key = CryptoJS.enc.Utf8.parse(environment.EncryptKey);
  private iv = CryptoJS.enc.Utf8.parse(environment.EncryptIV);

  constructor() { }

  encryptPostDataUsingAES256(data: any): any {
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  encryptGetDataUsingAES256(data: any): any {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decryptUsingAES256(decString: string) {
    var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
