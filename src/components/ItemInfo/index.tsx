import React from 'react';
import { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface WorkoutItem {
  date: string;
  type: string;
  distance: number;
  duration: number;
  id: string;
}

type Props = {
  item: WorkoutItem;
  testID?: string;
};

const ItemInfo: FC<Props> = ({ item, testID = 'ItemInfo' }) => {
  const formattedDate: string = item?.date
    ? new Date(item.date).toLocaleDateString()
    : 'DATE';

  return (
    <View testID={testID} style={styles.container}>
      <Text style={styles.name}>TYPE: {item?.type ?? 'TYPE'}</Text>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <Text style={styles.detail}>
          DISTANCE: {item?.distance ?? 'DISTANCE'}
        </Text>
        <Text style={styles.detail}>
          DURATION: {item?.duration ?? 'DURATION'}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.detail}>DATE: {formattedDate}</Text>
      </View>
    </View>
  );
};

export { ItemInfo };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    textTransform: 'uppercase',
  },
  detail: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
    textTransform: 'uppercase',
  },
});
