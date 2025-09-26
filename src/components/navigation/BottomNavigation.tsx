import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useResponsive } from '../../hooks/useResponsive';
import { resetGame, startNewGame } from '../../store/slices/gameSlice';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'new-game', label: 'New Game', icon: '🆕' },
  { id: 'computer', label: 'vs Computer', icon: '🤖' },
  { id: 'reset', label: 'Reset', icon: '🔄' },
  { id: 'exit', label: 'Exit', icon: '🚪' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const dispatch = useAppDispatch();
  const { isGameActive } = useAppSelector((state) => state.game);
  const { isMobile } = useResponsive();

  const handleTabPress = (tabId: string) => {
    switch (tabId) {
      case 'new-game':
        dispatch(startNewGame({ mode: 'local' }));
        break;
      case 'computer':
        dispatch(startNewGame({ mode: 'computer', difficulty: 'medium' }));
        break;
      case 'reset':
        if (isGameActive) {
          dispatch(resetGame());
        }
        break;
      case 'exit':
        // Exit functionality is handled by the global back handler
        break;
      default:
        onTabChange(tabId);
    }
  };

  return (
    <View style={[styles.container, isMobile && styles.mobileContainer]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab,
            isMobile && styles.mobileTab,
            tab.id === 'reset' && !isGameActive && styles.disabledTab
          ]}
          onPress={() => handleTabPress(tab.id)}
          disabled={tab.id === 'reset' && !isGameActive}
        >
          <Text style={[
            styles.icon, 
            isMobile && styles.mobileIcon,
            tab.id === 'reset' && !isGameActive && styles.disabledIcon
          ]}>
            {tab.icon}
          </Text>
          <Text style={[
            styles.label,
            activeTab === tab.id && styles.activeLabel,
            isMobile && styles.mobileLabel,
            tab.id === 'reset' && !isGameActive && styles.disabledLabel
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    // @ts-ignore - Web compatibility
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  mobileContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  mobileTab: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  activeTab: {
    backgroundColor: '#e3f2fd',
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  mobileIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  mobileLabel: {
    fontSize: 10,
  },
  activeLabel: {
    color: '#2196f3',
    fontWeight: '600',
  },
  disabledTab: {
    opacity: 0.3,
  },
  disabledIcon: {
    opacity: 0.3,
  },
  disabledLabel: {
    opacity: 0.3,
  },
});
