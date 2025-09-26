export interface Position {
  x: number;
  y: number;
}

export interface Square {
  position: Position;
  piece: Piece | null;
  color: 'light' | 'dark';
  isHighlighted?: boolean;
  isSelected?: boolean;
  isLastMove?: boolean;
}

export interface Piece {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'white' | 'black';
  position: Position;
  hasMoved?: boolean;
}

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  capturedPiece?: Piece;
  promotion?: 'queen' | 'rook' | 'bishop' | 'knight';
  isCheck?: boolean;
  isCheckmate?: boolean;
  isCastling?: boolean;
  isEnPassant?: boolean;
  notation: string;
}

export interface GameState {
  currentPlayer: 'white' | 'black';
  gameStatus: 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';
  moveHistory: Move[];
  capturedPieces: {
    white: Piece[];
    black: Piece[];
  };
  timeControl?: {
    white: number;
    black: number;
    increment?: number;
  };
  gameMode: 'local' | 'computer' | 'online';
  difficulty?: 'easy' | 'medium' | 'hard' | 'expert';
}

export interface GameSettings {
  timeControl: {
    type: 'blitz' | 'rapid' | 'classical' | 'bullet' | 'custom';
    minutes?: number;
    increment?: number;
  };
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  soundEnabled: boolean;
  animationsEnabled: boolean;
  showLegalMoves: boolean;
  showCoordinates: boolean;
}

export interface Player {
  id: string;
  username: string;
  rating: number;
  avatar?: string;
  isOnline: boolean;
  timeRemaining?: number;
}

export interface GameResult {
  winner: 'white' | 'black' | 'draw';
  reason: 'checkmate' | 'resignation' | 'timeout' | 'stalemate' | 'draw';
  moves: Move[];
  duration: number;
  ratingChange?: {
    white: number;
    black: number;
  };
}

