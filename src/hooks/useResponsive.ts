import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveState {
  screenSize: ScreenSize;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useResponsive = (): ResponsiveState => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    // Use different approaches for web vs native
    if (Platform.OS === 'web') {
      const handleResize = () => {
        const { width, height } = Dimensions.get('window');
        setDimensions({ width, height });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } else {
      const subscription = Dimensions.addEventListener('change', ({ window }) => {
        setDimensions({ width: window.width, height: window.height });
      });

      return () => subscription?.remove();
    }
  }, []);

  const { width, height } = dimensions;

  const getScreenSize = (): ScreenSize => {
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const screenSize = getScreenSize();

  return {
    screenSize,
    width,
    height,
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
  };
};
