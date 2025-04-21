import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Clock, Calendar, MapPin, QrCode } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface BookingCardProps {
  booking: any;
  onViewQR: () => void;
  onViewDetails: () => void;
}

export default function BookingCard({ booking, onViewQR, onViewDetails }: BookingCardProps) {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isActive = new Date(booking.endTime) > new Date();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.parkingName}>{booking.parkingName}</Text>
        {isActive && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Calendar size={16} color={Colors.neutral[600]} />
          <Text style={styles.infoText}>{formatDate(booking.startTime)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Clock size={16} color={Colors.neutral[600]} />
          <Text style={styles.infoText}>
            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MapPin size={16} color={Colors.neutral[600]} />
          <Text style={styles.infoText} numberOfLines={1}>
            {booking.parkingAddress}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.detailsButton} onPress={onViewDetails}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.qrButton} onPress={onViewQR}>
          <QrCode size={18} color={Colors.neutral[50]} />
          <Text style={styles.qrButtonText}>Entry QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  parkingName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    flex: 1,
  },
  statusBadge: {
    backgroundColor: Colors.primary[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary[700],
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
    marginLeft: 8,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
  },
  detailsButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[700],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  qrButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[50],
    marginLeft: 6,
  },
});