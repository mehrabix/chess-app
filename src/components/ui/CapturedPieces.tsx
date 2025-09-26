import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../hooks';
import { Piece } from '../../types/chess';

// Use text-based piece representation instead of Unicode symbols
const pieceSymbols: { [key: string]: string } = {
  king: 'K',
  queen: 'Q',
  rook: 'R',
  bishop: 'B',
  knight: 'N',
  pawn: 'P',
};

const pieceValues: { [key: string]: number } = {
  king: 0,
  queen: 9,
  rook: 5,
  bishop: 3,
  knight: 3,
  pawn: 1,
};

export const CapturedPieces: React.FC = () => {
  const { currentGame } = useAppSelector((state) => state.game);

  if (!currentGame) {
    return null;
  }

  const renderCapturedPieces = (pieces: Piece[], color: 'white' | 'black') => {
    if (pieces.length === 0) {
      return <Text style={styles.noPieces}>None</Text>;
    }

    // Group pieces by type and count them
    const pieceCounts: { [key: string]: number } = {};
    pieces.forEach(piece => {
      pieceCounts[piece.type] = (pieceCounts[piece.type] || 0) + 1;
    });

    // Sort by value (most valuable first)
    const sortedPieces = Object.entries(pieceCounts).sort(
      ([a], [b]) => pieceValues[b] - pieceValues[a]
    );

    return (
      <View style={styles.piecesContainer}>
        {sortedPieces.map(([pieceType, count]) => (
          <View key={pieceType} style={styles.pieceGroup}>
            <View style={[styles.pieceContainer, { backgroundColor: color === 'white' ? '#f0f0f0' : '#333' }]}>
              <Text style={[styles.pieceSymbol, { color: color === 'white' ? '#333' : '#fff' }]}>
                {pieceSymbols[pieceType]}
              </Text>
            </View>
            {count > 1 && (
              <Text style={styles.pieceCount}>{count}</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  const calculateMaterial = (pieces: Piece[]) => {
    return pieces.reduce((total, piece) => total + pieceValues[piece.type], 0);
  };

  const whiteMaterial = calculateMaterial(currentGame.capturedPieces.white);
  const blackMaterial = calculateMaterial(currentGame.capturedPieces.black);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Captured Pieces</Text>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>White Captured</Text>
          <Text style={styles.materialValue}>-{whiteMaterial}</Text>
        </View>
        {renderCapturedPieces(currentGame.capturedPieces.white, 'white')}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Black Captured</Text>
          <Text style={styles.materialValue}>-{blackMaterial}</Text>
        </View>
        {renderCapturedPieces(currentGame.capturedPieces.black, 'black')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    // @ts-ignore - Web compatibility
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  materialValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f44336',
  },
  piecesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  pieceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  pieceContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pieceSymbol: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pieceCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
    minWidth: 16,
    textAlign: 'center',
  },
  noPieces: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
