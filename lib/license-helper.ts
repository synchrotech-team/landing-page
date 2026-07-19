// ponytail: simple license key format helper satisfying SYNC-XXX-HRO-XXXX format
export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const rand = (len: number) => {
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  return `SYNC-${rand(3)}-HRO-${rand(4)}`;
}
