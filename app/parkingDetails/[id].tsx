import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Star, Car, Clock, Calendar, Info, MapPin } from 'lucide-react-native';
import { parkingData } from '@/data/parkingData';
import ImageCarousel from '@/components/ImageCarousel';
import AvailabilityTimeline from '@/components/AvailabilityTimeline';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

export default function ParkingDetailsScreen() {
  const { id } = useLocalSearchParams();
  const parking = parkingData.find(p => p.id.toString() === id);

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

  const handleBook = () => {
    router.push(`/booking/${parking.id}`);
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
        <Text style={styles.headerTitle}>Parking Details</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageCarousel images={parking.images} />

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.parkingName}>{parking.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={Colors.secondary[500]} fill={Colors.secondary[500]} />
              <Text style={styles.ratingText}>{parking.rating}</Text>
              <Text style={styles.reviewCount}>({parking.reviewCount})</Text>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <MapPin size={18} color={Colors.neutral[600]} />
            <Text style={styles.addressText}>{parking.address}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Car size={20} color={Colors.primary[700]} />
              <Text style={styles.infoText}>{parking.availableSpaces} Spaces</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={20} color={Colors.primary[700]} />
              <Text style={styles.infoText}>{parking.hours}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={20} color={Colors.primary[700]} />
              <Text style={styles.infoText}>All Days</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceSection}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            <View style={styles.priceCard}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Hourly Rate</Text>
                <Text style={styles.priceValue}>${parking.price}/hr</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Daily Maximum</Text>
                <Text style={styles.priceValue}>${parking.dailyPrice}/day</Text>
              </View>
            </View>
          </View>

          <View style={styles.availabilitySection}>
            <Text style={styles.sectionTitle}>Today's Availability</Text>
            <AvailabilityTimeline />
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{parking.description}</Text>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresList}>
              {parking.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Info size={16} color={Colors.primary[600]} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bookingBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceAmount}>${parking.price}</Text>
          <Text style={styles.priceUnit}>/hr</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBook}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
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
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 8,
  },
  parkingName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.neutral[800],
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
    marginLeft: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 8,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  infoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[700],
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: 16,
  },
  priceSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 12,
  },
  priceCard: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.neutral[600],
  },
  priceValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: Colors.neutral[800],
  },
  availabilitySection: {
    marginBottom: 16,
  },
  descriptionSection: {
    marginBottom: 16,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.neutral[700],
    lineHeight: 22,
  },
  featuresSection: {
    marginBottom: 80,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[700],
    marginLeft: 8,
  },
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: Colors.neutral[50],
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
  },
  priceUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    marginLeft: 4,
    marginBottom: 2,
  },
  bookButton: {
    backgroundColor: Colors.primary[700],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[50],
  },
});