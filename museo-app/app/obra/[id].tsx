import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getObraById } from '../../src/services/api';

export default function ObraDetalleScreen() {
  const { id } = useLocalSearchParams();
  const [obra, setObra] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getObraById(id as string);
      setObra(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (!obra) return <Text style={{ textAlign: 'center' }}>No se encontró la obra.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {obra.imagenUrl && <Image source={{ uri: obra.imagenUrl }} style={styles.img} />}
      <Text style={styles.title}>{obra.titulo}</Text>
      <Text>Autor: {obra.autor}</Text>
      <Text>Categoría: {obra.categoria}</Text>
      <Text>Fecha: {obra.fecha}</Text>
      <Text style={styles.desc}>{obra.descripcion}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  img: { width: '100%', height: 240, borderRadius: 12, marginBottom: 14 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  desc: { fontSize: 16, marginTop: 8, lineHeight: 22 },
});
