import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../hooks';

export const GameStatus: React.FC = () => {
  const { currentGame } = useAppSelector((state) => state.game);

  if (!currentGame) {
    return null;
  }

  const getStatusText = () => {
    switch (currentGame.gameStatus) {
      case 'check':
        return `Check! ${currentGame.currentPlayer === 'white' ? 'White' : 'Black'} is in check`;
      case 'checkmate':
        return `Checkmate! ${currentGame.currentPlayer === 'white' ? 'Black' : 'White'} wins!`;
      case 'stalemate':
        return 'Stalemate! Game is a draw';
      case 'draw':
        return 'Game is a draw';
      default:
        return `${currentGame.currentPlayer === 'white' ? 'White' : 'Black'}'s turn`;
    }
  };

  const getStatusColor = () => {
    switch (currentGame.gameStatus) {
      case 'check':
        return '#ff9800';
      case 'checkmate':
        return '#f44336';
      case 'stalemate':
      case 'draw':
        return '#9e9e9e';
      default:
        return '#2196f3';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.statusBar, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.statusText}>{getStatusText()}</Text>
      </View>
      
      <View style={styles.gameInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mode:</Text>
          <Text style={styles.infoValue}>{currentGame.gameMode}</Text>
        </View>
        
        {currentGame.difficulty && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Difficulty:</Text>
            <Text style={styles.infoValue}>{currentGame.difficulty}</Text>
          </View>
        )}
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Moves:</Text>
          <Text style={styles.infoValue}>{currentGame.moveHistory.length}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    // @ts-ignore - Web compatibility
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
    position: 'relative',
    zIndex: 2,
  },
  statusBar: {
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  gameInfo: {
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});
