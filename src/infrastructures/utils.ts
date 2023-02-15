import 'dotenv/config';

import { Logger } from '@nestjs/common';
// import phoneUtil = require('google-libphonenumber');
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';
import { createCipheriv, scrypt, createDecipheriv } from 'crypto';
// import * as moment from 'moment';

// import { OrisUnprocessableException } from './exceptions';
// import { ErrorCode } from './enums';

const logger = new Logger();
const iv = Buffer.from(process.env.ENC_IV_HEX || '', 'hex');
const salt = process.env.ENC_SALT || '';

export const STUDENT_CLIENT_ID = 'ecbc9048401d48a79b7ad280de0ee339'

export const hashString = async (
  text: string | null | undefined,
): Promise<string | null> => {
  if (text) {
    return await bcrypt.hash(text, 10);
  }
  return null;
};

export const log = (data: any): void => {
  if (data) {
    logger.log(data);
  }
};

export const compareHash = async (
  clearText: string | null | undefined,
  hashedText: string | null | undefined,
): Promise<boolean> => {
  if (clearText && hashedText) {
    return await bcrypt.compare(clearText, hashedText);
  }
  return false;
};

export const encryptString = async (
  textToEncrypt: string | null | undefined,
  password: string | null | undefined = process.env.ENC_AES_KEY,
): Promise<string | null> => {
  if (textToEncrypt && password) {
    const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedBuffer = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    return encryptedBuffer.toString('hex');
  }

  return null;
};

export const decryptString = async (
  encryptedText: string | null | undefined,
  password: string | null | undefined = process.env.ENC_AES_KEY,
): Promise<string | null> => {
  if (encryptedText && password) {
    const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedBuffer = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);

    return decryptedBuffer.toString();
  }

  return null;
};

// export const toIntlPhoneFormat = (
//   phone_number: string,
//   phone_country_code: string,
// ): string => {
//   const phoneUtilInstance = phoneUtil.PhoneNumberUtil.getInstance();
//   let formatted_phone_number;

//   try {
//     const parsed_phone = phoneUtilInstance.parse(
//       phone_number,
//       phone_country_code,
//     );
//     if (
//       phoneUtilInstance.isValidNumberForRegion(parsed_phone, phone_country_code)
//     ) {
//       formatted_phone_number =
//         parsed_phone.getCountryCode() + '' + parsed_phone.getNationalNumber();

//       return formatted_phone_number.startsWith('+')
//         ? formatted_phone_number.substring(1)
//         : formatted_phone_number;
//     }

//     throw OrisUnprocessableException.of(ErrorCode.INVALID_COUNTRY_PHONE);
//   } catch (e) {
//     console.error(e);
//     throw OrisUnprocessableException.of(ErrorCode.INVALID_COUNTRY_PHONE);
//   }
// };

// export const toReadableValidity = (life_span: number) => {
//   const validity = moment().add(life_span, 'seconds').fromNow();

//   return validity.substring(validity.indexOf(' '));
// };

export const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};
