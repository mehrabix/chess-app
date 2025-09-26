import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../hooks';
import { Move } from '../../types/chess';

interface MoveHistoryProps {
  onMoveSelect?: (moveIndex: number) => void;
  currentMoveIndex?: number;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ 
  onMoveSelect, 
  currentMoveIndex = -1 
}) => {
  const { currentGame } = useAppSelector((state) => state.game);

  if (!currentGame || currentGame.moveHistory.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Move History</Text>
        <Text style={styles.emptyText}>No moves yet</Text>
      </View>
    );
  }

  const renderMove = ({ item, index }: { item: Move; index: number }) => {
    const moveNumber = Math.floor(index / 2) + 1;
    const isWhiteMove = index % 2 === 0;
    const isSelected = index === currentMoveIndex;

    return (
      <View style={[styles.moveRow, isSelected && styles.selectedMove]}>
        {isWhiteMove && (
          <Text style={styles.moveNumber}>{moveNumber}.</Text>
        )}
        <Text 
          style={[
            styles.moveText, 
            isWhiteMove ? styles.whiteMove : styles.blackMove,
            isSelected && styles.selectedMoveText
          ]}
          onPress={() => onMoveSelect?.(index)}
        >
          {item.notation}
        </Text>
        {item.isCheck && <Text style={styles.checkSymbol}>+</Text>}
        {item.isCheckmate && <Text style={styles.checkmateSymbol}>#</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Move History</Text>
      <FlatList
        data={currentGame.moveHistory}
        renderItem={renderMove}
        keyExtractor={(_, index) => index.toString()}
        style={styles.moveList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.moveListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    // @ts-ignore - Web compatibility
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  moveList: {
    flex: 1,
  },
  moveListContent: {
    paddingBottom: 10,
  },
  moveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginVertical: 1,
  },
  selectedMove: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 3,
    borderLeftColor: '#2196f3',
  },
  moveNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    minWidth: 30,
    marginRight: 5,
  },
  moveText: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    minWidth: 40,
    textAlign: 'center',
  },
  whiteMove: {
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  blackMove: {
    backgroundColor: '#333',
    color: '#fff',
    marginLeft: 5,
  },
  selectedMoveText: {
    backgroundColor: '#2196f3',
    color: '#fff',
  },
  checkSymbol: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f44336',
    marginLeft: 4,
  },
  checkmateSymbol: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginLeft: 4,
  },
});
