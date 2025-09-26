import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSettings } from '../../types/chess';

interface SettingsState {
  gameSettings: GameSettings;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    gameInvites: boolean;
    gameEnd: boolean;
    dailyPuzzle: boolean;
  };
}

const initialState: SettingsState = {
  gameSettings: {
    timeControl: {
      type: 'rapid',
      minutes: 10,
      increment: 0,
    },
    difficulty: 'medium',
    soundEnabled: true,
    animationsEnabled: true,
    showLegalMoves: true,
    showCoordinates: true,
  },
  theme: 'auto',
  language: 'en',
  notifications: {
    gameInvites: true,
    gameEnd: true,
    dailyPuzzle: true,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateGameSettings: (state, action: PayloadAction<Partial<GameSettings>>) => {
      state.gameSettings = { ...state.gameSettings, ...action.payload };
    },
    
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.theme = action.payload;
    },
    
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    
    updateNotifications: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    
    resetSettings: (state) => {
      state.gameSettings = initialState.gameSettings;
      state.theme = initialState.theme;
      state.language = initialState.language;
      state.notifications = initialState.notifications;
    },
  },
});

export const {
  updateGameSettings,
  setTheme,
  setLanguage,
  updateNotifications,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;

