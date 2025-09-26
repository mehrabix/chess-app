import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../types/chess';

interface UserState {
  currentUser: Player | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    gamesDrawn: number;
    winRate: number;
    currentStreak: number;
    bestStreak: number;
  };
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  stats: {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    gamesDrawn: 0,
    winRate: 0,
    currentStreak: 0,
    bestStreak: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Player>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    
    updateUser: (state, action: PayloadAction<Partial<Player>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    
    updateStats: (state, action: PayloadAction<Partial<UserState['stats']>>) => {
      state.stats = { ...state.stats, ...action.payload };
      
      // Recalculate win rate
      if (state.stats.gamesPlayed > 0) {
        state.stats.winRate = (state.stats.gamesWon / state.stats.gamesPlayed) * 100;
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  login,
  logout,
  updateUser,
  updateStats,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;

