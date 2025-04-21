import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { LogOut, Plus, FileText, Car, Clock, Settings } from 'lucide-react-native';
import { parkingData } from '@/data/parkingData';
import { dummyBookingData } from '@/data/bookingData';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const totalRevenue = dummyBookingData.reduce((sum, booking) => sum + booking.price, 0);
  const totalBookings = dummyBookingData.length;
  const totalParkingSpots = parkingData.reduce((sum, parking) => sum + parking.totalSpaces, 0);
  const availableSpots = parkingData.reduce((sum, parking) => sum + parking.availableSpaces, 0);

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Manage your parking facilities</Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={Colors.error[600]} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: Colors.primary[50] }]}>
            <View style={styles.statHeader}>
              <FileText size={24} color={Colors.primary[700]} />
              <Text style={styles.statTitle}>Revenue</Text>
            </View>
            <Text style={styles.statValue}>${totalRevenue}</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: Colors.secondary[50] }]}>
            <View style={styles.statHeader}>
              <Clock size={24} color={Colors.secondary[700]} />
              <Text style={styles.statTitle}>Bookings</Text>
            </View>
            <Text style={styles.statValue}>{totalBookings}</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: Colors.success[50] }]}>
            <View style={styles.statHeader}>
              <Car size={24} color={Colors.success[700]} />
              <Text style={styles.statTitle}>Total Spots</Text>
            </View>
            <Text style={styles.statValue}>{totalParkingSpots}</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: Colors.accent[50] }]}>
            <View style={styles.statHeader}>
              <Settings size={24} color={Colors.accent[700]} />
              <Text style={styles.statTitle}>Available</Text>
            </View>
            <Text style={styles.statValue}>{availableSpots}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {dummyBookingData.slice(0, 5).map((booking, index) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{booking.parkingName}</Text>
                <Text style={styles.bookingDetails}>
                  {new Date(booking.startTime).toLocaleDateString()} • ${booking.price}
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: booking.status === 'confirmed' ? Colors.success[100] : Colors.neutral[100] }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: booking.status === 'confirmed' ? Colors.success[700] : Colors.neutral[700] }
                ]}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Parking Facilities</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color={Colors.primary[700]} />
              <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
          </View>

          {parkingData.map((parking) => (
            <View key={parking.id} style={styles.parkingCard}>
              <View style={styles.parkingInfo}>
                <Text style={styles.parkingName}>{parking.name}</Text>
                <Text style={styles.parkingAddress}>{parking.address}</Text>
                <View style={styles.parkingStats}>
                  <Text style={styles.parkingStat}>
                    Available: {parking.availableSpaces}/{parking.totalSpaces}
                  </Text>
                  <Text style={styles.parkingStat}>
                    Rate: ${parking.price}/hr
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.error[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginLeft: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  viewAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[700],
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[700],
    marginLeft: 4,
  },
  bookingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  bookingDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  parkingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  parkingInfo: {
    flex: 1,
  },
  parkingName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  parkingAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 8,
  },
  parkingStats: {
    flexDirection: 'row',
    gap: 16,
  },
  parkingStat: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.neutral[700],
  },
  editButton: {
    backgroundColor: Colors.primary[50],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[700],
  },
});