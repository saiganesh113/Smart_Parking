import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Calendar, Clock, Plus, Minus, Info, CreditCard } from 'lucide-react-native';
import DatePicker from '@/components/DatePicker';
import TimePicker from '@/components/TimePicker';
import { parkingData } from '@/data/parkingData';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

export default function BookingScreen() {
  const { id } = useLocalSearchParams();
  const parking = parkingData.find(p => p.id.toString() === id);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(new Date().setHours(new Date().getHours() + 2)));
  const [hours, setHours] = useState(2);
  const [vehicle, setVehicle] = useState('My Car (ABC-1234)');

  if (!parking) {
    return (
      <SafeAreaWrapper style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Parking spot not found</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaWrapper>
    );
  }

  const handleTimeChange = (isStart, time) => {
    if (isStart) {
      setStartTime(time);
      // Calculate new end time based on hours
      const newEndTime = new Date(time);
      newEndTime.setHours(time.getHours() + hours);
      setEndTime(newEndTime);
    } else {
      setEndTime(time);
      // Calculate new hours
      const diffMs = time - startTime;
      const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
      setHours(diffHrs > 0 ? diffHrs : 1);
    }
  };

  const handleHoursChange = (increment) => {
    const newHours = hours + increment;
    if (newHours >= 1 && newHours <= 24) {
      setHours(newHours);
      // Update end time
      const newEndTime = new Date(startTime);
      newEndTime.setHours(startTime.getHours() + newHours);
      setEndTime(newEndTime);
    }
  };

  const calculateTotal = () => {
    return (parking.price * hours).toFixed(2);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleProceedToPayment = () => {
    router.push('/payment');
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Parking</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>{parking.name}</Text>
          <Text style={styles.locationAddress}>{parking.address}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color={Colors.primary[700]} />
            <Text style={styles.sectionTitle}>Select Date</Text>
          </View>
          <DatePicker 
            selectedDate={selectedDate} 
            onDateChange={handleDateChange} 
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color={Colors.primary[700]} />
            <Text style={styles.sectionTitle}>Select Time</Text>
          </View>
          
          <View style={styles.timeContainer}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Start Time</Text>
              <TimePicker 
                selectedTime={startTime} 
                onTimeChange={(time) => handleTimeChange(true, time)} 
              />
            </View>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>End Time</Text>
              <TimePicker 
                selectedTime={endTime} 
                onTimeChange={(time) => handleTimeChange(false, time)} 
              />
            </View>
          </View>

          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Duration</Text>
            <View style={styles.durationControls}>
              <TouchableOpacity 
                style={styles.durationButton}
                onPress={() => handleHoursChange(-1)}
                disabled={hours <= 1}
              >
                <Minus size={20} color={hours <= 1 ? Colors.neutral[300] : Colors.primary[700]} />
              </TouchableOpacity>
              <Text style={styles.durationValue}>{hours} hour{hours !== 1 ? 's' : ''}</Text>
              <TouchableOpacity 
                style={styles.durationButton}
                onPress={() => handleHoursChange(1)}
                disabled={hours >= 24}
              >
                <Plus size={20} color={hours >= 24 ? Colors.neutral[300] : Colors.primary[700]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={20} color={Colors.primary[700]} />
            <Text style={styles.sectionTitle}>Vehicle Information</Text>
          </View>
          <TouchableOpacity style={styles.vehicleSelector}>
            <Text style={styles.vehicleText}>{vehicle}</Text>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time</Text>
              <Text style={styles.summaryValue}>
                {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryValue}>{hours} hour{hours !== 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Vehicle</Text>
              <Text style={styles.summaryValue}>{vehicle}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Price per hour</Text>
              <Text style={styles.summaryValue}>${parking.price.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${calculateTotal()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.paymentBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total:</Text>
          <Text style={styles.priceValue}>${calculateTotal()}</Text>
        </View>
        <TouchableOpacity 
          style={styles.paymentButton}
          onPress={handleProceedToPayment}
        >
          <CreditCard size={18} color={Colors.neutral[50]} />
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.neutral[700],
    marginBottom: 16,
  },
  backButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary[700],
  },
  content: {
    flex: 1,
    padding: 16,
  },
  locationCard: {
    backgroundColor: Colors.primary[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  locationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.primary[800],
    marginBottom: 4,
  },
  locationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.primary[600],
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginLeft: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeColumn: {
    width: '48%',
  },
  timeLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 8,
  },
  durationContainer: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  durationLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[700],
    marginBottom: 12,
  },
  durationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  vehicleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  vehicleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  changeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.primary[700],
  },
  summaryCard: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.neutral[600],
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: Colors.neutral[800],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[300],
    marginVertical: 12,
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.primary[700],
  },
  paymentBar: {
    height: 80,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    backgroundColor: Colors.neutral[50],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  priceValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.neutral[900],
  },
  paymentButton: {
    backgroundColor: Colors.primary[700],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  paymentButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[50],
    marginLeft: 8,
  },
});