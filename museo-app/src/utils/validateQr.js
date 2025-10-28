// src/utils/validateQr.js
// Permití: id simple (obra_123) o URL del museo que incluya el id (…/obra/obra_123)
export function parseObraIdFromQr(data) {
  if (!data || typeof data !== 'string') return null;

  // Ej 1: "obra_123"
  if (/^obra_[a-zA-Z0-9_-]+$/.test(data)) return data;

  // Ej 2: "https://museo-lapampa.ar/obra/obra_123"
  const m = data.match(/\/obra\/(obra_[a-zA-Z0-9_-]+)/);
  if (m) return m[1];

  return null;
}
//hola 