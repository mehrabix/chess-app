import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

interface SwipeGestureWrapperProps {
  children: React.ReactNode;
  onSwipeRight: () => void;
  enabled?: boolean;
}

export const SwipeGestureWrapper: React.FC<SwipeGestureWrapperProps> = ({ 
  children, 
  onSwipeRight, 
  enabled = true 
}) => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      scale.value = withSpring(0.98);
    })
    .onUpdate((event) => {
      'worklet';
      // Only allow right swipe (positive translationX) with visual feedback
      if (event.translationX > 0) {
        const progress = Math.min(event.translationX / 100, 1);
        translateX.value = event.translationX * 0.3;
        scale.value = withSpring(1 - progress * 0.02);
      }
    })
    .onEnd((event) => {
      'worklet';
      const shouldTrigger = event.translationX > 80 || 
                           (event.translationX > 50 && event.velocityX > 300);
      
      if (shouldTrigger) {
        runOnJS(onSwipeRight)();
      }
      
      // Reset with smooth animation
      translateX.value = withSpring(0);
      scale.value = withSpring(1);
    })
    .activeOffsetX(15) // Start detecting after 15px movement
    .failOffsetY([-25, 25]) // Fail if vertical movement is too much
    .minDistance(10); // Minimum distance to start gesture

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value }
      ],
    };
  });

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
