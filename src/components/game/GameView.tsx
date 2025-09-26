import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../hooks';
import { useResponsive } from '../../hooks/useResponsive';
import { ChessBoard } from '../chess/ChessBoard';
import { CapturedPieces } from '../ui/CapturedPieces';
import { GameControls } from '../ui/GameControls';
import { GameStatus } from '../ui/GameStatus';
import { MoveHistory } from '../ui/MoveHistory';

export const GameView: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();
  const { currentGame } = useAppSelector((state) => state.game);

  if (isMobile) {
    return (
      <ScrollView 
        style={styles.mobileContainer}
        contentContainerStyle={styles.mobileScrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.mobileBoard}>
          <ChessBoard />
        </View>
        {currentGame && (
          <View style={styles.mobilePanels}>
            <GameStatus />
            <GameControls />
          </View>
        )}
      </ScrollView>
    );
  }

  if (isTablet) {
    return (
      <ScrollView 
        style={styles.tabletContainer}
        contentContainerStyle={styles.tabletScrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.tabletContent}>
          {currentGame && (
            <View style={styles.tabletLeft}>
              <GameStatus />
              <CapturedPieces />
              <GameControls />
            </View>
          )}
          <View style={[styles.tabletCenter, !currentGame && styles.tabletCenterFull]}>
            <ChessBoard />
          </View>
          {currentGame && (
            <View style={styles.tabletRight}>
              <MoveHistory />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }

  // Desktop layout
  return (
    <View style={styles.desktopContainer}>
      {currentGame && (
        <View style={styles.desktopLeft}>
          <GameStatus />
          <CapturedPieces />
          <GameControls />
        </View>
      )}
      <View style={[styles.desktopCenter, !currentGame && styles.desktopCenterFull]}>
        <ChessBoard />
      </View>
      {currentGame && (
        <View style={styles.desktopRight}>
          <MoveHistory />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Mobile styles
  mobileContainer: {
    flex: 1,
  },
  mobileScrollContent: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  mobileBoard: {
    minHeight: 350,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
  },
  mobilePanels: {
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
    zIndex: 2,
  },

  // Tablet styles
  tabletContainer: {
    flex: 1,
  },
  tabletScrollContent: {
    flexGrow: 1,
  },
  tabletContent: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    minHeight: '100%',
  },
  tabletLeft: {
    flex: 1,
    maxWidth: 250,
    gap: 15,
  },
  tabletCenter: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabletCenterFull: {
    flex: 1,
    width: '100%',
  },
  tabletRight: {
    flex: 1,
    maxWidth: 250,
  },

  // Desktop styles
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  desktopLeft: {
    flex: 1,
    maxWidth: 300,
    gap: 20,
  },
  desktopCenter: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desktopCenterFull: {
    flex: 1,
    width: '100%',
  },
  desktopRight: {
    flex: 1,
    maxWidth: 300,
  },
});
