// LargeSquareButton.tsx
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ItemButtonProps {
  onPress: () => void;
  type: 'edit' | 'remove';
  size?: number;
}

const ItemButton: React.FC<ItemButtonProps> = ({
  onPress,
  type,
  size = 40,
}) => {
  const iconName = type === 'edit' ? 'edit' : 'trash';
  const buttonColor = type === 'edit' ? '#43E3CD' : '#F72586';

  return (
    <Pressable
      style={[
        styles.button,
        { width: size, height: size, backgroundColor: buttonColor },
      ]}
      onPress={onPress}
    >
      <Feather name={iconName} size={size * 0.6} color='white' />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export { ItemButton };
