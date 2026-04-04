export function normalizeDigits(value) {
  return String(value ?? '').replace(/\D/g, '');
}

export function luhnCheck(digits) {
  if (!digits || digits.length < 13) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = parseInt(digits[i], 10);
    if (Number.isNaN(n)) return false;
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

export function validateCardNumber(value) {
  const d = normalizeDigits(value);
  if (d.length === 0) return 'cardNumberRequired';
  if (d.length < 13 || d.length > 19) return 'cardNumberLength';
  if (!luhnCheck(d)) return 'cardNumberLuhn';
  return null;
}

export function validateExpiry(value) {
  const raw = String(value ?? '').trim().replace(/\s/g, '');
  if (raw.length === 0) return 'expiryRequired';
  const m = raw.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return 'expiryFormat';
  const month = parseInt(m[1], 10);
  const yy = parseInt(m[2], 10);
  if (month < 1 || month > 12) return 'expiryMonth';
  const now = new Date();
  const yFull = 2000 + yy;
  const curY = now.getFullYear();
  const curM = now.getMonth() + 1;
  if (yFull < curY) return 'expiryExpired';
  if (yFull === curY && month < curM) return 'expiryExpired';
  return null;
}

export function validateCvc(value) {
  const d = normalizeDigits(value);
  if (d.length === 0) return 'cvcRequired';
  if (d.length !== 3 && d.length !== 4) return 'cvcLength';
  return null;
}

export function formatCardNumberInput(raw) {
  const d = normalizeDigits(raw).slice(0, 19);
  const parts = [];
  for (let i = 0; i < d.length; i += 4) {
    parts.push(d.slice(i, i + 4));
  }
  return parts.join(' ');
}

export function formatExpiryInput(raw) {
  const d = normalizeDigits(raw).slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}
