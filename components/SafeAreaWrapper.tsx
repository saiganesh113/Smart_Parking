import { View, Platform, StyleSheet, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps extends ViewProps {
  children: React.ReactNode;
}

export default function SafeAreaWrapper({ children, style, ...props }: SafeAreaWrapperProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      style={[
        styles.container,
        { 
          paddingTop: Platform.OS === 'ios' ? insets.top : 0,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
        },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});