import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MapPin, Star, Car } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface ParkingCardProps {
  parking: any;
  onPress: () => void;
}

export default function ParkingCard({ parking, onPress }: ParkingCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: parking.images[0] }} 
        style={styles.image}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{parking.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.secondary[500]} fill={Colors.secondary[500]} />
            <Text style={styles.rating}>{parking.rating}</Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Colors.neutral[500]} />
          <Text style={styles.location} numberOfLines={1}>
            {parking.address}
          </Text>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.availabilityContainer}>
            <Car size={14} color={Colors.primary[700]} />
            <Text style={styles.availability}>
              {parking.availableSpaces} spots available
            </Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${parking.price}</Text>
            <Text style={styles.priceUnit}>/hr</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 4,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  availability: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary[700],
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  priceUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
    marginLeft: 2,
    marginBottom: 2,
  },
});