import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, Animated } from 'react-native';
import { router } from 'expo-router';
import { Search, Navigation, Filter } from 'lucide-react-native';
import { parkingData } from '@/data/parkingData';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import SearchBar from '@/components/SearchBar';
import ParkingCard from '@/components/ParkingCard';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

const INITIAL_REGION = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(INITIAL_REGION);
  const [selectedParking, setSelectedParking] = useState(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      if (location) {
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  const handleMarkerPress = (parking) => {
    setSelectedParking(parking);
  };

  const handleViewDetails = (id) => {
    router.push(`/parkingDetails/${id}`);
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <Animated.View style={[
        styles.header,
        { opacity: headerOpacity, 
          transform: [{ 
            translateY: scrollY.interpolate({
              inputRange: [0, 50],
              outputRange: [-50, 0],
              extrapolate: 'clamp',
            }) 
          }] 
        }
      ]}>
        <Text style={styles.headerTitle}>Urban Parking</Text>
      </Animated.View>

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          showsUserLocation
        >
          {parkingData.map((parking) => (
            <Marker
              key={parking.id}
              coordinate={{
                latitude: parking.latitude,
                longitude: parking.longitude,
              }}
              title={parking.name}
              description={`$${parking.price}/hr`}
              onPress={() => handleMarkerPress(parking)}
            />
          ))}
        </MapView>

        <View style={styles.searchBarContainer}>
          <SearchBar />
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Navigation size={24} color={Colors.primary[700]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Filter size={24} color={Colors.primary[700]} />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView
        style={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Text style={styles.sectionTitle}>Parking Near You</Text>
        {parkingData.map((parking) => (
          <ParkingCard
            key={parking.id}
            parking={parking}
            onPress={() => handleViewDetails(parking.id)}
          />
        ))}
      </Animated.ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: Colors.neutral[50],
    zIndex: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.primary[800],
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.45,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBarContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    right: 20,
    zIndex: 5,
  },
  actionButtonsContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    flexDirection: 'column',
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginVertical: 16,
    color: Colors.neutral[800],
  },
});