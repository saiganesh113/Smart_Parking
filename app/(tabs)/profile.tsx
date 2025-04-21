import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LogOut, CreditCard, Car, Bell, HelpCircle, Settings, ChevronRight } from 'lucide-react-native';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {
  const userProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };

  const menuItems = [
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={22} color={Colors.neutral[600]} />,
      action: () => console.log('Payment Methods'),
    },
    {
      id: 'vehicles',
      title: 'My Vehicles',
      icon: <Car size={22} color={Colors.neutral[600]} />,
      action: () => console.log('My Vehicles'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={22} color={Colors.neutral[600]} />,
      action: () => console.log('Notifications'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={22} color={Colors.neutral[600]} />,
      action: () => console.log('Help & Support'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={22} color={Colors.neutral[600]} />,
      action: () => console.log('Settings'),
    },
  ];

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: userProfile.avatar }} 
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color={Colors.neutral[400]} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={22} color={Colors.error[600]} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
  },
  menuContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[700],
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: Colors.neutral[100],
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.error[600],
    marginLeft: 10,
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
  },
});