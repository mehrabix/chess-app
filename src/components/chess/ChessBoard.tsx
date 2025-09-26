import Chessboard from '@hasenkrug/react-native-chessboard-adapted';
import { Chess } from 'chess.js';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useResponsive } from '../../hooks/useResponsive';
import { stockfishEngine } from '../../services/stockfish';
import { makeMove } from '../../store/slices/gameSlice';

export const ChessBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentGame } = useAppSelector((state) => state.game);
  const { width, height, isMobile, isTablet } = useResponsive();
  const [chess] = useState(new Chess());
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  // Calculate responsive board size
  const getBoardSize = () => {
    if (isMobile) {
      // Mobile: use most of the available width, but leave some padding
      return Math.min(width - 60, height * 0.35, 320);
    } else if (isTablet) {
      // Tablet: balance between width and height
      return Math.min(width * 0.4, height * 0.5, 400);
    } else {
      // Desktop: larger board
      return Math.min(width * 0.3, height * 0.6, 500);
    }
  };

  const boardSize = getBoardSize();

  const handleMove = async (move: any) => {
    try {
      // The chessboard library passes a different format, extract the actual move
      const moveString = move.move ? move.move.san : move.san || move;
      const result = chess.move(moveString);
      if (!result) {
        console.error('Invalid move:', move);
        return;
      }

      dispatch(makeMove({
          from: { x: result.from.charCodeAt(0) - 97, y: 8 - parseInt(result.from[1]) },
          to: { x: result.to.charCodeAt(0) - 97, y: 8 - parseInt(result.to[1]) },
          piece: {
            type: result.piece as 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn',
            color: result.color as 'white' | 'black',
            position: { x: result.from.charCodeAt(0) - 97, y: 8 - parseInt(result.from[1]) }
          },
          notation: result.san,
          isCheck: chess.isCheck(),
          isCheckmate: chess.isCheckmate(),
        }));

        // If it's a computer game and it's the computer's turn
        if (currentGame?.gameMode === 'computer' && chess.turn() === 'b' && currentGame.currentPlayer === 'black') {
          setIsComputerThinking(true);
          setTimeout(async () => {
            const bestMove = await stockfishEngine.getBestMove(chess.fen());
            if (!bestMove) {
              console.error('No best move found');
              setIsComputerThinking(false);
              return;
            }

            const computerResult = chess.move(bestMove);
            if (!computerResult) {
              console.error('Computer move failed:', bestMove);
              setIsComputerThinking(false);
              return;
            }

            dispatch(makeMove({
              from: { x: bestMove.charCodeAt(0) - 97, y: 8 - parseInt(bestMove[1]) },
              to: { x: bestMove.charCodeAt(2) - 97, y: 8 - parseInt(bestMove[3]) },
              piece: {
                type: computerResult.piece as 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn',
                color: computerResult.color as 'white' | 'black',
                position: { x: bestMove.charCodeAt(0) - 97, y: 8 - parseInt(bestMove[1]) }
              },
              notation: computerResult.san,
              isCheck: chess.isCheck(),
              isCheckmate: chess.isCheckmate(),
            }));

            setIsComputerThinking(false);
          }, 1000);
        }
    } catch (error) {
      console.log('Invalid move:', error);
    }
  };


  return (
    <View style={[styles.container, isMobile && styles.mobileContainer]}>
      {isComputerThinking && (
        <View style={[styles.thinkingIndicator, isMobile && styles.mobileThinkingIndicator]}>
          <Text style={[styles.thinkingText, isMobile && styles.mobileThinkingText]}>
            Computer is thinking...
          </Text>
        </View>
      )}
      <View style={[styles.boardWrapper, { width: boardSize, height: boardSize }]}>
        <Chessboard
          fen={chess.fen()}
          onMove={handleMove}
          boardSize={boardSize}
          colors={{
            black: '#B58863',
            white: '#F0D9B5',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    position: 'relative',
  },
  mobileContainer: {
    padding: 5,
    minHeight: 300,
  },
  boardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    // @ts-ignore - Web compatibility
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
    elevation: 5,
    position: 'relative',
    zIndex: 1,
  },
  thinkingIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  mobileThinkingIndicator: {
    top: 10,
    left: 10,
    right: 10,
    padding: 8,
  },
  thinkingText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  mobileThinkingText: {
    fontSize: 14,
  },
});
