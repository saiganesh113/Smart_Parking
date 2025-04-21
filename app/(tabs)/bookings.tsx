import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated } from 'react-native';
import { router } from 'expo-router';
import { QrCode, Clock, Calendar } from 'lucide-react-native';
import { dummyBookingData } from '@/data/bookingData';
import BookingCard from '@/components/BookingCard';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('active');
  
  const renderBookingCard = ({ item }) => (
    <BookingCard 
      booking={item} 
      onViewQR={() => router.push(`/qrCode/${item.id}`)}
      onViewDetails={() => router.push(`/booking/${item.id}`)}
    />
  );

  const activeBookings = dummyBookingData.filter(booking => 
    new Date(booking.endTime) > new Date()
  );
  
  const pastBookings = dummyBookingData.filter(booking => 
    new Date(booking.endTime) <= new Date()
  );

  const getEmptyMessage = () => {
    if (activeTab === 'active') {
      return "You don't have any active bookings";
    } else {
      return "No past bookings found";
    }
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'active' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('active')}
        >
          <Clock 
            size={18} 
            color={activeTab === 'active' ? Colors.primary[700] : Colors.neutral[500]} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'active' && styles.activeTabText
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'history' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Calendar 
            size={18} 
            color={activeTab === 'history' ? Colors.primary[700] : Colors.neutral[500]} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'history' && styles.activeTabText
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'active' ? activeBookings : pastBookings}
        renderItem={renderBookingCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{getEmptyMessage()}</Text>
          </View>
        }
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.primary[800],
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: Colors.primary[50],
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
    color: Colors.neutral[500],
  },
  activeTabText: {
    color: Colors.primary[700],
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});