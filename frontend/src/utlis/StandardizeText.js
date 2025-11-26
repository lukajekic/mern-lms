// utils/normalizeString.js
export function StandardizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, ''); // remove everything except letters and numbers
}
