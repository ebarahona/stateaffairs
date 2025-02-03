import React, { useState } from 'react';
import type { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useStore } from '@hooks';

import { ItemButton } from '@components';
import { ItemInfo } from '@components';
import { ITEM_BUTTON_SIZE as SIZE } from '@configuration/constants';

interface WorkoutItem {
  date: string;
  type: string;
  distance: number;
  duration: number;
  id: string;
}

type RootStackParamList = {
  EditScreen: { workout: WorkoutItem };
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'EditScreen'>;

type Props = {
  item: WorkoutItem;
  testID?: string;
};

const WorkoutItem: FC<Props> = ({ item, testID = 'WorkoutItem' }) => {
  const { removeWorkout } = useStore();
  const navigation = useNavigation<NavigationProps>();

  const handleButton = (type: 'edit' | 'remove') => {
    if (type === 'edit') {
      navigation.navigate('Edit', { workout: item });
    } else {
      removeWorkout(item.id);
    }
  };

  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.left}>
        <ItemInfo item={item} />
      </View>
      <View style={styles.buttons}>
        <ItemButton
          type='remove'
          size={SIZE}
          onPress={() => handleButton('remove')}
        />
        <ItemButton
          type='edit'
          size={SIZE}
          onPress={() => handleButton('edit')}
        />
      </View>
    </View>
  );
};

export { WorkoutItem };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    paddingVertical: 24,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 10,
  },
});
