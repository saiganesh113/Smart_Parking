import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Search, Filter, Check, X } from 'lucide-react-native';
import { dummyBookingData } from '@/data/bookingData';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

export default function AdminBookings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'completed', label: 'Completed' },
  ];

  const filteredBookings = dummyBookingData.filter(booking => {
    const matchesSearch = booking.parkingName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || booking.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookings</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.neutral[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bookings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.neutral[400]}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.primary[700]} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.filterChipSelected
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterChipText,
              selectedFilter === filter.id && styles.filterChipTextSelected
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.bookingsList} showsVerticalScrollIndicator={false}>
        {filteredBookings.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <View>
                <Text style={styles.bookingTitle}>{booking.parkingName}</Text>
                <Text style={styles.bookingId}>Booking #{booking.id}</Text>
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

            <View style={styles.bookingDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>
                  {new Date(booking.startTime).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>
                  {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Vehicle</Text>
                <Text style={styles.detailValue}>{booking.vehicle}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment</Text>
                <Text style={styles.detailValue}>${booking.price}</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.approveButton]}
                onPress={() => console.log('Approve booking', booking.id)}
              >
                <Check size={18} color={Colors.success[700]} />
                <Text style={[styles.actionButtonText, styles.approveButtonText]}>
                  Approve
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => console.log('Reject booking', booking.id)}
              >
                <X size={18} color={Colors.error[700]} />
                <Text style={[styles.actionButtonText, styles.rejectButtonText]}>
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[900],
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary[50],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.neutral[100],
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: Colors.primary[700],
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  filterChipTextSelected: {
    color: Colors.neutral[50],
  },
  bookingsList: {
    flex: 1,
    padding: 20,
  },
  bookingCard: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bookingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  bookingId: {
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
  bookingDetails: {
    backgroundColor: Colors.neutral[50],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  detailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  approveButton: {
    backgroundColor: Colors.success[50],
    borderColor: Colors.success[200],
  },
  rejectButton: {
    backgroundColor: Colors.error[50],
    borderColor: Colors.error[200],
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  approveButtonText: {
    color: Colors.success[700],
  },
  rejectButtonText: {
    color: Colors.error[700],
  },
});