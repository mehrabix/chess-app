import React from 'react';
import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetGame, startNewGame } from '../../store/slices/gameSlice';

export const GameControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentGame, isGameActive } = useAppSelector((state) => state.game);

  const handleNewGame = () => {
    dispatch(startNewGame({ mode: 'local' }));
  };

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  const handleComputerGame = () => {
    dispatch(startNewGame({ mode: 'computer', difficulty: 'medium' }));
  };

  const handleExitApp = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit the chess app?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => BackHandler.exitApp(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleNewGame}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleComputerGame}>
          <Text style={styles.buttonText}>vs Computer</Text>
        </TouchableOpacity>
      </View>
      
      {isGameActive && (
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleResetGame}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={[styles.button, styles.exitButton]} onPress={handleExitApp}>
        <Text style={styles.buttonText}>Exit App</Text>
      </TouchableOpacity>
      
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    alignSelf: 'center',
  },
  exitButton: {
    backgroundColor: '#666',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  gameInfo: {
    marginTop: 10,
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

