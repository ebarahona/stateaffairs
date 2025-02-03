import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Statistic {
  title: string;
  value: number;
  subtitle?: string;
}

interface CounterWidgetProps {
  item?: Statistic;
  countFontSize?: number;
}

const ITEM: Statistic = {
  title: 'Total',
  value: 35,
  subtitle: 'Workouts',
};

const CounterWidget: React.FC<CounterWidgetProps> = ({
  item = ITEM,
  countFontSize = 60,
}) => {
  const { title, value, subtitle } = item;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={[styles.number, { fontSize: countFontSize }]}>{value}</Text>
      {subtitle && <Text>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 10,
  },
});

export { CounterWidget };
