import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { WorkoutForm } from '@components';

interface EditScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<{ params: { workout: any } }, 'params'>;
}

const EditScreen: React.FC<EditScreenProps> = ({ navigation, route }) => {
  const { workout } = route?.params;

  return (
    <View style={styles.container} testID='edit-screen'>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <WorkoutForm workout={workout} />
    </View>
  );
};

export { EditScreen };

const styles = StyleSheet.create({
  container: { flex: 1 },
  cancelButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  cancelText: {
    fontSize: 16,
    color: 'blue',
  },
});
