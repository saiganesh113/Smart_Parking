import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Colors from '@/constants/Colors';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const flatListRef = useRef<FlatList>(null);

  // Generate an array of dates for the next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Format day name (Mon, Tue, etc)
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Format day number (1, 2, etc)
  const getDayNumber = (date: Date) => {
    return date.getDate();
  };

  // Check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const handleSelectDate = (date: Date) => {
    onDateChange(date);
  };

  const renderDateItem = ({ item }) => {
    const isSelected = isSameDay(item, selectedDate);
    
    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          isSelected && styles.selectedDateItem
        ]}
        onPress={() => handleSelectDate(item)}
      >
        <Text style={[
          styles.dayName,
          isSelected && styles.selectedDayName
        ]}>
          {getDayName(item)}
        </Text>
        <Text style={[
          styles.dayNumber,
          isSelected && styles.selectedDayNumber
        ]}>
          {getDayNumber(item)}
        </Text>
        {isToday(item) && (
          <View style={styles.todayIndicator} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dates}
        renderItem={renderDateItem}
        keyExtractor={(item) => item.toISOString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
  },
  flatListContent: {
    paddingHorizontal: 8,
  },
  dateItem: {
    width: 60,
    height: 70,
    borderRadius: 12,
    backgroundColor: Colors.neutral[100],
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  selectedDateItem: {
    backgroundColor: Colors.primary[700],
  },
  dayName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 6,
  },
  selectedDayName: {
    color: Colors.neutral[100],
  },
  dayNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  selectedDayNumber: {
    color: Colors.neutral[50],
  },
  todayIndicator: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.secondary[500],
  },
});