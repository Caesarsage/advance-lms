import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtKey: process.env.JWT_SECRET || '',
  tokenSensitivity: process.env.JWT_TOKEN_SENSITIVITY || ''
}));