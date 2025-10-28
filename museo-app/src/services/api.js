// src/services/api.js
const BASE_URL = 'https://TU-SERVIDOR/api'; // <-- ajustá esto cuando tengas backend

export async function getObraById(obraId) {
  try {
    const res = await fetch(`${BASE_URL}/imagenes/${encodeURIComponent(obraId)}`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (e) {
    // Fallback MOCK para desarrollo / demo
    return {
      id: obraId,
      titulo: 'Gliptodonte fósil',
      autor: 'Equipo Paleontología',
      categoria: 'Paleontología',
      descripcion: 'Registro fósil de un gliptodonte hallado en La Pampa.',
      imagenUrl: 'https://picsum.photos/1000/600',
      palabrasClave: ['gliptodonte', 'fósil', 'pampa'],
      fecha: '1898-05-12',
    };
  }
}
