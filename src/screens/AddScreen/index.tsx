import React from 'react';
import { View, StyleSheet } from 'react-native';

import { WorkoutForm } from '@components';

const AddScreen = () => {
  return (
    <View style={styles.container} testID='add-screen'>
      <WorkoutForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export { AddScreen };
