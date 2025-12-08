import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SortCategory } from '../services/placesApi';

interface CategoryItemProps {
  item: { id: SortCategory; name: string };
  isActive: boolean;
  onPress: (id: SortCategory) => void;
}

const CategoryItem = React.memo(({ item, isActive, onPress }: CategoryItemProps) => {
  return (
    <TouchableOpacity 
      onPress={() => onPress(item.id)}
      style={[
        styles.categoryItem, 
        isActive && styles.categoryItemActive
      ]}
    >
      <Text style={[
        styles.categoryText, 
        isActive && styles.categoryTextActive
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  categoryItem: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
  },
  categoryItemActive: {
    backgroundColor: '#202020',
  },
  categoryText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 15,
  },
  categoryTextActive: {
    color: '#FFF',
  },
});

export default CategoryItem;
