import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Move } from '../../types/chess';

interface GameSliceState {
  currentGame: GameState | null;
  gameHistory: GameState[];
  isGameActive: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: GameSliceState = {
  currentGame: null,
  gameHistory: [],
  isGameActive: false,
  isLoading: false,
  error: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startNewGame: (state, action: PayloadAction<{ mode: 'local' | 'computer' | 'online'; difficulty?: string }>) => {
      state.currentGame = createInitialGameState(action.payload.mode, action.payload.difficulty);
      state.isGameActive = true;
      state.error = null;
    },
    
    
    makeMove: (state, action: PayloadAction<Move>) => {
      if (!state.currentGame) return;
      
      // Add to move history
      state.currentGame.moveHistory.push(action.payload);
      
      // Switch players
      state.currentGame.currentPlayer = state.currentGame.currentPlayer === 'white' ? 'black' : 'white';
    },
    
    resetGame: (state) => {
      state.currentGame = null;
      state.isGameActive = false;
      state.error = null;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Helper functions
function createInitialGameState(mode: 'local' | 'computer' | 'online', difficulty?: string): GameState {
  return {
    currentPlayer: 'white',
    gameStatus: 'playing',
    moveHistory: [],
    capturedPieces: { white: [], black: [] },
    gameMode: mode,
    difficulty: difficulty as any,
  };
}

// These functions are no longer needed since we're using the chessboard library

export const {
  startNewGame,
  makeMove,
  resetGame,
  setLoading,
  setError,
} = gameSlice.actions;

export default gameSlice.reducer;
