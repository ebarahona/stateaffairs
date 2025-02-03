import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useStore } from '@hooks';
import { useNavigation } from '@react-navigation/native';

const WorkoutForm = ({ workout = null }) => {
  const navigation = useNavigation();
  const { saveWorkout } = useStore();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: workout?.type || '',
      duration: workout?.duration?.toString() || '',
      distance: workout?.distance?.toString() || '',
      date: workout?.date ? new Date(workout.date) : new Date(),
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const selectedType = watch('type');

  const workoutTypes = [
    { label: 'Walk', value: 'walk' },
    { label: 'Jog', value: 'jog' },
    { label: 'Run', value: 'run' },
    { label: 'Hike', value: 'hike' },
  ];

  const selectWorkoutType = (value) => setValue('type', value);

  const onSubmit = (data) => {
    console.log(data);
    saveWorkout({
      id: workout?.id || null,
      type: data.type,
      duration: parseFloat(data.duration),
      distance: parseFloat(data.distance),
      date: data.date.toISOString(),
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{workout ? 'Edit Workout' : 'Log It!'}</Text>

      <Controller
        control={control}
        name='type'
        rules={{ required: 'Select a workout type' }}
        render={({ field: { value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Workout Type</Text>
            <View style={styles.optionsContainer}>
              {workoutTypes.map((type) => (
                <Pressable
                  key={type.value}
                  style={[
                    styles.optionButton,
                    selectedType === type.value && styles.optionButtonSelected,
                  ]}
                  onPress={() => selectWorkoutType(type.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedType === type.value && styles.optionTextSelected,
                    ]}
                  >
                    {type.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            {errors.type && (
              <Text style={styles.errorText}>
                {errors.type?.message as string}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name='duration'
        rules={{
          required: 'Duration is required',
          pattern: { value: /^\d+$/, message: 'Please enter a valid number' },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Duration (minutes)</Text>
            <TextInput
              style={[styles.inputStyle, styles.input]}
              onChangeText={onChange}
              value={value}
              keyboardType='numeric'
              placeholder='Enter duration in minutes'
              placeholderTextColor='#999'
            />
            {errors.duration && (
              <Text style={styles.errorText}>
                {errors.duration?.message as string}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name='distance'
        rules={{
          required: 'Distance is required',
          pattern: {
            value: /^\d*\.?\d*$/,
            message: 'Please enter a valid number',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Distance (miles)</Text>
            <TextInput
              style={[styles.inputStyle, styles.input]}
              onChangeText={onChange}
              value={value}
              keyboardType='numeric'
              placeholder='Enter distance in miles'
              placeholderTextColor='#999'
            />
            {errors.distance && (
              <Text style={styles.errorText}>
                {errors.distance?.message as string}
              </Text>
            )}
          </View>
        )}
      />

      {/* Date Picker */}
      <Controller
        control={control}
        name='date'
        rules={{ required: 'Date is required' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={[styles.inputStyle, styles.dateButton]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{value.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={value}
                mode='date'
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    onChange(selectedDate);
                  }
                }}
              />
            )}
            {errors.date && (
              <Text style={styles.errorText}>{errors.date.message}</Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={[styles.inputStyle, styles.submitButtonText]}>
          {workout ? 'Update' : 'Save'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export { WorkoutForm };

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10, fontWeight: '500', color: '#000' },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputStyle: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'transparent',
    fontSize: 14,
    fontWeight: '500',
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    padding: 20,
  },
  optionButtonSelected: { backgroundColor: '#007AFF' },
  optionText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionTextSelected: { color: '#fff' },
  input: { color: '#000' },
  errorText: { color: 'red', fontSize: 12, marginTop: 5 },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  dateButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
