import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface TimePickerProps {
  selectedTime: Date;
  onTimeChange: (time: Date) => void;
}

export default function TimePicker({ selectedTime, onTimeChange }: TimePickerProps) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Format time as HH:MM AM/PM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleTimeIncrement = (minutes: number) => {
    const newTime = new Date(selectedTime);
    newTime.setMinutes(selectedTime.getMinutes() + minutes);
    onTimeChange(newTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <View style={styles.timeDisplay}>
          <Clock size={18} color={Colors.neutral[600]} />
          <Text style={styles.timeText}>{formatTime(selectedTime)}</Text>
        </View>
        
        <View style={styles.timeControls}>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => handleTimeIncrement(-30)}
          >
            <Text style={styles.timeButtonText}>-30m</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => handleTimeIncrement(30)}
          >
            <Text style={styles.timeButtonText}>+30m</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  timeContainer: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginLeft: 8,
  },
  timeControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeButton: {
    backgroundColor: Colors.neutral[200],
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  timeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.neutral[700],
  },
});