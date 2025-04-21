import { Tabs } from 'expo-router';
import { StyleSheet, View, Platform } from 'react-native';
import { Map, Clock, User, Plus } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const tabBarStyle = Platform.OS === 'ios' 
    ? { 
        position: 'absolute', 
        bottom: 20, 
        left: 20, 
        right: 20, 
        elevation: 0,
        borderRadius: 20,
        height: 80,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
      }
    : {
        borderTopWidth: 1,
        borderTopColor: Colors.neutral[200],
        height: 60,
        paddingBottom: 8,
      };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary[700],
        tabBarInactiveTintColor: Colors.neutral[400],
        tabBarBackground: Platform.OS === 'ios' ? () => (
          <BlurView
            tint="light"
            intensity={80}
            style={StyleSheet.absoluteFill}
          />
        ) : undefined,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}