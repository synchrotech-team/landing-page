import crypto from 'crypto';

// ponytail: native crypto helper to avoid jsonwebtoken dependency.
const SECRET = process.env.NEXTAUTH_SECRET || 'default-jwt-secret-synchrotech';

export function generateLicenseToken(payload: {
  licenseKey: string;
  deviceId: string;
  expiryDate: string;
}): string {
  const payloadStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadStr).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(base64Payload)
    .digest('base64url');

  return `${base64Payload}.${signature}`;
}

export function verifyLicenseToken(token: string): {
  licenseKey: string;
  deviceId: string;
  expiryDate: string;
} | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    
    const [base64Payload, signature] = parts;
    
    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(base64Payload)
      .digest('base64url');

    if (signature !== expectedSignature) return null;

    const payloadStr = Buffer.from(base64Payload, 'base64url').toString('utf8');
    return JSON.parse(payloadStr);
  } catch {
    return null;
  }
}
