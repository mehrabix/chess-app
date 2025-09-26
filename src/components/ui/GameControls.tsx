import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../hooks';

export const GameControls: React.FC = () => {
  const { currentGame } = useAppSelector((state) => state.game);

  return (
    <View style={styles.container}>
      {currentGame && (
        <View style={styles.gameInfo}>
          <Text style={styles.infoText}>
            Current Player: {currentGame.currentPlayer === 'white' ? 'White' : 'Black'}
          </Text>
          <Text style={styles.infoText}>
            Game Mode: {currentGame.gameMode}
          </Text>
          <Text style={styles.infoText}>
            Moves: {currentGame.moveHistory.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'relative',
    zIndex: 2,
  },
  gameInfo: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

