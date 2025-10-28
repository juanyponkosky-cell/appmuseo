// src/components/ScannerFrame.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ScannerFrame() {
  return (
    <View pointerEvents="none" style={styles.frame}>
      <View style={styles.cornerTL} />
      <View style={styles.cornerTR} />
      <View style={styles.cornerBL} />
      <View style={styles.cornerBR} />
    </View>
  );
}

const corner = {
  position: 'absolute',
  width: 30, height: 30, borderColor: '#00FFAA', borderWidth: 4,
};

const styles = StyleSheet.create({
  frame: {
    position: 'absolute',
    alignSelf: 'center',
    top: '20%',
    width: 260,
    height: 260,
    borderColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
  },
  cornerTL: { ...corner, left: -2, top: -2, borderRightWidth: 0, borderBottomWidth: 0, borderRadius: 6 },
  cornerTR: { ...corner, right: -2, top: -2, borderLeftWidth: 0, borderBottomWidth: 0, borderRadius: 6 },
  cornerBL: { ...corner, left: -2, bottom: -2, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 6 },
  cornerBR: { ...corner, right: -2, bottom: -2, borderLeftWidth: 0, borderTopWidth: 0, borderRadius: 6 },
});
