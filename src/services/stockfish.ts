import { Chess } from 'chess.js';

export class StockfishEngine {
  private worker: Worker | null = null;
  private isReady = false;

  constructor() {
    this.initializeWorker();
  }

  private initializeWorker() {
    try {
      // For React Native, we'll use a simple AI instead of actual Stockfish
      // In a real implementation, you'd use a WebAssembly version of Stockfish
      this.isReady = true;
    } catch (error) {
      console.error('Failed to initialize Stockfish:', error);
    }
  }

  async getBestMove(fen: string, depth: number = 15): Promise<string | null> {
    if (!this.isReady) {
      return null;
    }

    try {
      // Simple AI implementation - in production, use actual Stockfish
      const chess = new Chess(fen);
      const moves = chess.moves();
      
      if (moves.length === 0) {
        return null;
      }

      // Simple evaluation: prefer captures and center control
      let bestMove = moves[0];
      let bestScore = -Infinity;

      for (const move of moves) {
        let score = 0;
        
        // Prefer captures
        if (move.includes('x')) {
          score += 10;
        }
        
        // Prefer center control
        const toSquare = move.slice(-2);
        if (['d4', 'd5', 'e4', 'e5'].includes(toSquare)) {
          score += 5;
        }
        
        // Prefer piece development
        if (move.includes('N') || move.includes('B')) {
          score += 3;
        }
        
        // Random factor to make it less predictable
        score += Math.random() * 2;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }

      return bestMove;
    } catch (error) {
      console.error('Error getting best move:', error);
      return null;
    }
  }

  async evaluatePosition(fen: string): Promise<number> {
    if (!this.isReady) {
      return 0;
    }

    try {
      const chess = new Chess(fen);
      
      // Simple material evaluation
      let score = 0;
      const board = chess.board();
      
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          const piece = board[y][x];
          if (piece) {
            const pieceValues: { [key: string]: number } = {
              'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0
            };
            
            const value = pieceValues[piece.type] || 0;
            score += piece.color === 'w' ? value : -value;
          }
        }
      }
      
      return score;
    } catch (error) {
      console.error('Error evaluating position:', error);
      return 0;
    }
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.isReady = false;
  }
}

export const stockfishEngine = new StockfishEngine();

