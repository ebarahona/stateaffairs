import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { WorkoutItem } from '@components';
import { useStore } from '@hooks';

interface WorkoutItem {
  date: string;
  type: string;
  distance: number;
  duration: number;
  id: string;
}

interface ScreenProps {}

const ListScreen: React.FC<ScreenProps> = () => {
  const { workouts }: { workouts: WorkoutItem[] } = useStore();

  const EmptyMessage: React.FC = () => (
    <View style={[styles.container, styles.empty]}>
      <Text style={styles.message}>You have no workouts</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={workouts ?? []}
        ListEmptyComponent={EmptyMessage}
        renderItem={({ item }: { item: WorkoutItem }) => (
          <WorkoutItem item={item} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={40}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        scrollEnabled
      />
    </SafeAreaView>
  );
};

export { ListScreen };

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
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.555)',
    height: 1,
  },
});
