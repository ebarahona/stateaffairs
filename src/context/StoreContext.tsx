import React, { createContext, useCallback, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { workouts as workoutService } from '@services';
import * as Crypto from 'expo-crypto';
import { set } from 'react-hook-form';

const ERROR_MESSAGE: string = 'Whoops, something went wrong!';

interface Workout {
  id: string;
  date: string;
  duration: number;
  distance: number;
  type: 'run' | 'bike' | 'swim' | 'other';
}

interface StoreContextProps {
  workouts: Workout[];
  loading: boolean;
  error: string;
  stats: {
    totalWorkouts: number | 0;
    totalDistance: number | 0;
    totalDuration: number | 0;
  };
  getWorkouts: () => Promise<void>;
  saveWorkout: (workout: Omit<Workout, 'id'> & { id?: string | null }) => void;
  removeWorkout: (workoutId: string) => void;
}

const initialState = {
  workouts: [],
  loading: false,
  error: '',
  stats: {
    totalWorkouts: 0,
    totalDistance: 0,
    totalDuration: 0,
  },
};

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

// Context in combination with useReducer would allow to handle more actions and keep pure functions
// would also allow to handle more complex state changes
const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState(initialState);

  const throwError = (error: string) => {
    setState((prevState) => ({ ...prevState, error, loading: false }));
  };

  const calculateStats = () => {
    const totalWorkouts = state.workouts.length;
    const totalDistance = state.workouts.reduce(
      (acc, workout) => acc + workout.distance,
      0
    );
    const totalDuration = state.workouts.reduce(
      (acc, workout) => acc + workout.duration,
      0
    );
    setState((prevState) => ({
      ...prevState,
      stats: {
        totalWorkouts,
        totalDistance,
        totalDuration,
      },
    }));
  };

  const getWorkouts = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const data = await workoutService.get();
      if (!data) {
        throwError(ERROR_MESSAGE);
        return;
      } else {
        // Sort workouts by date, most recent first
        const sortedWorkouts = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setState((prevState) => ({
          ...prevState,
          workouts: sortedWorkouts,
          loading: false,
        }));

        // Calculate stats
        calculateStats();
        return;
      }
    } catch (error) {
      throwError(ERROR_MESSAGE);
    }
  }, []);

  /* 
      Basic logic to check if workout has an ID, if it does we edit the workout
      if not we create a new workout, normally we separate this logic into two functions, 
      the backend would handle this and validate as this is a mock service
      - security risk if we did this on the client side
      - redundancy code in set state 

    */
  const saveWorkout = async (
    workout: Omit<Workout, 'id'> & { id?: string | null }
  ) => {
    if (!workout) {
      throwError(ERROR_MESSAGE);
      return;
    }

    setState((prevState) => ({ ...prevState, loading: true }));

    try {
      let updatedWorkouts;

      if (workout.id) {
        updatedWorkouts = state.workouts.map((w) =>
          w.id === workout.id ? { ...w, ...workout } : w
        );
      } else {
        const workoutId = Crypto.randomUUID();
        const newWorkout = {
          ...workout,
          id: workoutId,
        };
        updatedWorkouts = [newWorkout, ...state.workouts];
      }

      // we should ensure that we save in backend before updating local state
      // but in this case the local state triggers the save in useEffect
      setState((prevState) => ({
        ...prevState,
        workouts: updatedWorkouts,
        loading: false,
      }));
    } catch (error) {
      throwError(ERROR_MESSAGE);
    }
  };

  const removeWorkout = async (workoutId: string) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      setState((prevState) => ({
        ...prevState,
        workouts: prevState.workouts.filter(
          (workout) => workout.id !== workoutId
        ),
        loading: false,
      }));
    } catch (error) {
      throwError(ERROR_MESSAGE);
    }
  };

  const value: StoreContextProps = {
    workouts: state.workouts,
    stats: state.stats,
    loading: state.loading,
    error: state.error,
    getWorkouts,
    saveWorkout,
    removeWorkout,
  };

  useEffect(() => {
    if (state.workouts.length) {
      workoutService.post(state.workouts);
    }
  }, [state.workouts]);

  useEffect(() => {
    calculateStats();
  }, [state.workouts]);

  useEffect(() => {
    getWorkouts();
  }, [getWorkouts]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export { StoreProvider };
export default StoreContext;
