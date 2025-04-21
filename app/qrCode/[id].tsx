import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Calendar, Clock, Share2, Download, Car } from 'lucide-react-native';
import { dummyBookingData } from '@/data/bookingData';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

export default function QRCodeScreen() {
  const { id } = useLocalSearchParams();
  const booking = dummyBookingData.find(b => b.id.toString() === id);

  if (!booking) {
    return (
      <SafeAreaWrapper style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Booking not found</Text>
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

  // Format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleGoToBookings = () => {
    router.replace('/(tabs)/bookings');
  };

  const handleShare = () => {
    console.log('Share QR code');
  };

  const handleDownload = () => {
    console.log('Download QR code');
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <ArrowLeft size={22} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking QR Code</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>{booking.parkingName}</Text>
          <Text style={styles.locationAddress}>{booking.parkingAddress}</Text>
        </View>

        <View style={styles.qrCardContainer}>
          <View style={styles.qrCard}>
            <Text style={styles.qrTitle}>Entry & Exit Code</Text>
            <Text style={styles.qrSubtitle}>
              Scan at parking entry and exit gates
            </Text>
            
            <Image
              source={{ 
                uri: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + booking.id
              }}
              style={styles.qrCode}
            />
            
            <Text style={styles.bookingId}>Booking ID: #{booking.id}</Text>
            
            <View style={styles.qrActions}>
              <TouchableOpacity style={styles.qrActionButton} onPress={handleShare}>
                <Share2 size={22} color={Colors.primary[700]} />
                <Text style={styles.qrActionText}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.qrActionButton} onPress={handleDownload}>
                <Download size={22} color={Colors.primary[700]} />
                <Text style={styles.qrActionText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Calendar size={22} color={Colors.primary[700]} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>
                {formatDate(booking.startTime)}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Clock size={22} color={Colors.primary[700]} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Time</Text>
              <Text style={styles.infoValue}>
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Car size={22} color={Colors.primary[700]} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Vehicle</Text>
              <Text style={styles.infoValue}>{booking.vehicle}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bookingsButton}
          onPress={handleGoToBookings}
        >
          <Text style={styles.bookingsButtonText}>View All Bookings</Text>
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
  qrCardContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  qrCard: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 16,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  qrTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  qrSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: 16,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  bookingId: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 16,
  },
  qrActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: 16,
  },
  qrActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  qrActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[700],
    marginLeft: 6,
  },
  infoContainer: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  bookingsButton: {
    backgroundColor: Colors.primary[50],
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary[300],
  },
  bookingsButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary[700],
  },
});