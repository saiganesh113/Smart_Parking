import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FileText, Download, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react-native';
import { dummyBookingData } from '@/data/bookingData';
import { parkingData } from '@/data/parkingData';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const periods = ['Today', 'This Week', 'This Month', 'This Year'];

  // Calculate some dummy statistics
  const totalRevenue = dummyBookingData.reduce((sum, booking) => sum + booking.price, 0);
  const previousRevenue = totalRevenue * 0.8; // Dummy previous period revenue
  const revenueGrowth = ((totalRevenue - previousRevenue) / previousRevenue) * 100;

  const totalBookings = dummyBookingData.length;
  const previousBookings = Math.floor(totalBookings * 0.9); // Dummy previous period bookings
  const bookingsGrowth = ((totalBookings - previousBookings) / previousBookings) * 100;

  const occupancyRate = Math.round(
    (parkingData.reduce((sum, parking) => sum + (parking.totalSpaces - parking.availableSpaces), 0) /
    parkingData.reduce((sum, parking) => sum + parking.totalSpaces, 0)) * 100
  );

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.periodSelector}>
          <TouchableOpacity style={styles.periodButton}>
            <Text style={styles.periodButtonText}>{selectedPeriod}</Text>
            <ChevronDown size={20} color={Colors.neutral[700]} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Total Revenue</Text>
              <View style={[
                styles.growthBadge,
                revenueGrowth >= 0 ? styles.positiveGrowth : styles.negativeGrowth
              ]}>
                {revenueGrowth >= 0 ? (
                  <TrendingUp size={14} color={Colors.success[700]} />
                ) : (
                  <TrendingDown size={14} color={Colors.error[700]} />
                )}
                <Text style={[
                  styles.growthText,
                  revenueGrowth >= 0 ? styles.positiveGrowthText : styles.negativeGrowthText
                ]}>
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </Text>
              </View>
            </View>
            <Text style={styles.statValue}>${totalRevenue}</Text>
            <Text style={styles.statComparison}>
              vs ${previousRevenue} last period
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Total Bookings</Text>
              <View style={[
                styles.growthBadge,
                bookingsGrowth >= 0 ? styles.positiveGrowth : styles.negativeGrowth
              ]}>
                {bookingsGrowth >= 0 ? (
                  <TrendingUp size={14} color={Colors.success[700]} />
                ) : (
                  <TrendingDown size={14} color={Colors.error[700]} />
                )}
                <Text style={[
                  styles.growthText,
                  bookingsGrowth >= 0 ? styles.positiveGrowthText : styles.negativeGrowthText
                ]}>
                  {Math.abs(bookingsGrowth).toFixed(1)}%
                </Text>
              </View>
            </View>
            <Text style={styles.statValue}>{totalBookings}</Text>
            <Text style={styles.statComparison}>
              vs {previousBookings} last period
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Occupancy Rate</Text>
            </View>
            <Text style={styles.statValue}>{occupancyRate}%</Text>
            <Text style={styles.statComparison}>
              Average across all facilities
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Reports</Text>
          </View>

          <View style={styles.reportsList}>
            {[
              {
                title: 'Revenue Report',
                description: 'Detailed breakdown of earnings and transactions',
                type: 'PDF'
              },
              {
                title: 'Occupancy Analysis',
                description: 'Parking space utilization patterns',
                type: 'Excel'
              },
              {
                title: 'Customer Feedback',
                description: 'User ratings and reviews summary',
                type: 'PDF'
              },
              {
                title: 'Booking Trends',
                description: 'Analysis of booking patterns and peak hours',
                type: 'Excel'
              }
            ].map((report, index) => (
              <TouchableOpacity key={index} style={styles.reportCard}>
                <View style={styles.reportInfo}>
                  <FileText size={24} color={Colors.primary[700]} />
                  <View style={styles.reportText}>
                    <Text style={styles.reportTitle}>{report.title}</Text>
                    <Text style={styles.reportDescription}>{report.description}</Text>
                  </View>
                </View>
                <View style={styles.reportActions}>
                  <View style={styles.reportType}>
                    <Text style={styles.reportTypeText}>{report.type}</Text>
                  </View>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Download size={20} color={Colors.primary[700]} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
  },
  content: {
    flex: 1,
    padding: 20,
  },
  periodSelector: {
    marginBottom: 24,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  periodButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[700],
    marginRight: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positiveGrowth: {
    backgroundColor: Colors.success[50],
  },
  negativeGrowth: {
    backgroundColor: Colors.error[50],
  },
  growthText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  positiveGrowthText: {
    color: Colors.success[700],
  },
  negativeGrowthText: {
    color: Colors.error[700],
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  statComparison: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  reportsList: {
    gap: 12,
  },
  reportCard: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  reportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportText: {
    marginLeft: 12,
    flex: 1,
  },
  reportTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  reportDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  reportActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reportType: {
    backgroundColor: Colors.primary[50],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  reportTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary[700],
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
});