import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';

export default function AvailabilityTimeline() {
  // Generate hours from 6am to 10pm
  const hours = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 6; // Start from 6am
    return {
      hour,
      label: `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? 'am' : 'pm'}`,
      availability: Math.random() > 0.3 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
    };
  });

  // Current hour
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.timelineContainer}>
          {hours.map((item, index) => (
            <View key={index} style={styles.hourContainer}>
              <View 
                style={[
                  styles.availabilityBar, 
                  styles[item.availability],
                  currentHour === item.hour && styles.currentHour
                ]}
              />
              <Text style={[
                styles.hourLabel,
                currentHour === item.hour && styles.currentHourLabel
              ]}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.highDot]} />
          <Text style={styles.legendText}>High</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.mediumDot]} />
          <Text style={styles.legendText}>Medium</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.lowDot]} />
          <Text style={styles.legendText}>Low</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  timelineContainer: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'flex-end',
  },
  hourContainer: {
    alignItems: 'center',
    width: 40,
    marginRight: 12,
  },
  availabilityBar: {
    width: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  high: {
    backgroundColor: Colors.success[500],
    height: 40,
  },
  medium: {
    backgroundColor: Colors.secondary[500],
    height: 25,
  },
  low: {
    backgroundColor: Colors.error[500],
    height: 10,
  },
  hourLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
  },
  currentHour: {
    borderWidth: 2,
    borderColor: Colors.primary[700],
  },
  currentHourLabel: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary[700],
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  highDot: {
    backgroundColor: Colors.success[500],
  },
  mediumDot: {
    backgroundColor: Colors.secondary[500],
  },
  lowDot: {
    backgroundColor: Colors.error[500],
  },
  legendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[700],
  },
});