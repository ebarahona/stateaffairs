import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { CounterWidget } from '@components';
import LottieView from 'lottie-react-native';
import { useStore } from '@hooks';

interface ScreenProps {}

const HomeScreen: React.FC<ScreenProps> = () => {
  const [statistics, setStatistics] = useState({
    workouts: { title: 'Workouts', value: 0 },
    distance: { title: 'Distance', value: 0, subtitle: 'miles' },
    duration: { title: 'Duration', value: 0, subtitle: 'minutes' },
  });
  const { stats } = useStore();

  const animation = useRef(null);
  useEffect(() => {
    animation.current?.play();
    setTimeout(() => {}, 2500);
  }, []);

  useEffect(() => {
    setStatistics({
      workouts: { title: 'Workouts', value: stats.totalWorkouts },
      distance: {
        title: 'Distance',
        value: stats.totalDistance,
        subtitle: 'miles',
      },
      duration: {
        title: 'Duration',
        value: stats.totalDuration,
        subtitle: 'minutes',
      },
    });
  }, [stats]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.widgetContainer}>
        <CounterWidget item={statistics.workouts} />
      </View>
      <View style={styles.widgetContainer}>
        <CounterWidget item={statistics.distance} countFontSize={40} />
        <CounterWidget item={statistics.duration} countFontSize={40} />
      </View>
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          loop={true}
          ref={animation}
          style={styles.animation}
          source={require('@assets/walking.json')}
        />
      </View>
    </SafeAreaView>
  );
};

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
    flexGrow: 1,
  },
  message: {
    fontSize: 20,
    fontWeight: '500',
  },
  list: {
    paddingBottom: 20,
  },
  footer: {
    width: '100%',
    padding: 16,
    paddingBottom: 40,
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.555)',
    height: 1,
  },
});
