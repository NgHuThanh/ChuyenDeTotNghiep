import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';

interface SwipeGestureHandlerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeGestureHandler: React.FC<SwipeGestureHandlerProps> = ({ onSwipeLeft, onSwipeRight }) => {
  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx: { startX: number }) => {
      ctx.startX = _.x;
    },
    onActive: (_, ctx: { startX: number }) => {
      const deltaX = _.x - ctx.startX;
      if (deltaX > 50) {
        onSwipeRight();
      } else if (deltaX < -50) {
        onSwipeLeft();
      }
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View style={StyleSheet.absoluteFillObject} />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SwipeGestureHandler;
