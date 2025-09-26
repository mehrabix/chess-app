import Chessboard from '@hasenkrug/react-native-chessboard-adapted';
import { Chess } from 'chess.js';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { stockfishEngine } from '../../services/stockfish';
import { makeMove, startNewGame } from '../../store/slices/gameSlice';

const { width, height } = Dimensions.get('window');
const BOARD_SIZE = Math.min(width - 20, height * 0.6, 350);

export const ChessBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentGame } = useAppSelector((state) => state.game);
  const [chess] = useState(new Chess());
  const [isComputerThinking, setIsComputerThinking] = useState(false);

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

  const handleNewGame = () => {
    chess.reset();
    dispatch(startNewGame({ mode: 'local' }));
  };

  return (
    <View style={styles.container}>
      {isComputerThinking && (
        <View style={styles.thinkingIndicator}>
          <Text style={styles.thinkingText}>Computer is thinking...</Text>
        </View>
      )}
      <View style={styles.boardWrapper}>
        <Chessboard
          fen={chess.fen()}
          onMove={handleMove}
          boardSize={BOARD_SIZE}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  boardWrapper: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  thinkingText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
