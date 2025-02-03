import AsyncStorage from '@react-native-async-storage/async-storage';

const getWorkouts = async () => {
  try {
    const storedWorkouts = await AsyncStorage.getItem('workouts');
    return storedWorkouts ? JSON.parse(storedWorkouts) : [];
  } catch (error) {
    console.error('Error fetching workouts from AsyncStorage:', error);
    return [];
  }
};

const postWorkouts = async (newWorkouts) => {
  try {
    await AsyncStorage.setItem('workouts', JSON.stringify(newWorkouts));
    return newWorkouts;
  } catch (error) {
    console.error('Error updating workouts:', error);
    return null;
  }
};

export const workouts = {
  get: getWorkouts,
  post: postWorkouts,
};
