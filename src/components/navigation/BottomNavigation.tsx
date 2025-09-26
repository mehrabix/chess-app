import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'game', label: 'Game', icon: '♟️' },
  { id: 'history', label: 'History', icon: '📜' },
  { id: 'analysis', label: 'Analysis', icon: '🔍' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const { isMobile } = useResponsive();

  return (
    <View style={[styles.container, isMobile && styles.mobileContainer]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab,
            isMobile && styles.mobileTab
          ]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text style={[styles.icon, isMobile && styles.mobileIcon]}>
            {tab.icon}
          </Text>
          <Text style={[
            styles.label,
            activeTab === tab.id && styles.activeLabel,
            isMobile && styles.mobileLabel
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
});
