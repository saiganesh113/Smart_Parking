import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Search, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <Search size={20} color={Colors.neutral[500]} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search for parking"
        placeholderTextColor={Colors.neutral[400]}
      />
      <TouchableOpacity style={styles.locationButton}>
        <MapPin size={20} color={Colors.primary[700]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[50],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    paddingRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  locationButton: {
    paddingLeft: 8,
    height: '100%',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.neutral[200],
    paddingHorizontal: 12,
  },
});