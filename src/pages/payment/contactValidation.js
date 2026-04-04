import { normalizeDigits } from './cardValidation';

const NAME_MIN = 2;
const NAME_MAX = 80;
const NAME_PATTERN = /^[\p{L}\s'.-]+$/u;

export function validatePersonName(value, fieldKey) {
  const t = String(value ?? '').trim();
  const requiredKey = fieldKey === 'lastName' ? 'lastNameRequired' : 'firstNameRequired';
  if (t.length === 0) return requiredKey;
  if (t.length < NAME_MIN) return 'nameTooShort';
  if (t.length > NAME_MAX) return 'nameTooLong';
  if (!NAME_PATTERN.test(t)) return 'nameInvalidChars';
  return null;
}

export function validateBirthDate(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return 'birthDateRequired';
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return 'birthDateInvalid';
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10);
  const day = parseInt(m[3], 10);
  const d = new Date(y, mo - 1, day);
  if (d.getFullYear() !== y || d.getMonth() !== mo - 1 || d.getDate() !== day) return 'birthDateInvalid';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  if (d > today) return 'birthDateFuture';
  const age = getAgeYears(d, today);
  if (age < 18) return 'birthDateMinAge';
  if (age > 120) return 'birthDateMaxAge';
  return null;
}

function getAgeYears(birth, ref) {
  let age = ref.getFullYear() - birth.getFullYear();
  const md = ref.getMonth() - birth.getMonth();
  if (md < 0 || (md === 0 && ref.getDate() < birth.getDate())) age -= 1;
  return age;
}

export function validateEmail(value) {
  const t = String(value ?? '').trim();
  if (!t) return 'emailRequired';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return 'emailInvalid';
  return null;
}

export function validatePhone(value) {
  const d = normalizeDigits(value);
  if (d.length === 0) return 'phoneRequired';
  if (d.length < 10 || d.length > 15) return 'phoneLength';
  return null;
}

export function validateAddress(value) {
  const t = String(value ?? '').trim();
  if (!t) return 'addressRequired';
  if (t.length < 8) return 'addressShort';
  return null;
}
