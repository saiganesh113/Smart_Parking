import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, CreditCard, Plus } from 'lucide-react-native';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Colors from '@/constants/Colors';

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState('card1');
  
  const paymentMethods = [
    {
      id: 'card1',
      type: 'visa',
      lastFour: '4242',
      expiryDate: '05/25',
      isDefault: true,
    },
    {
      id: 'card2',
      type: 'mastercard',
      lastFour: '8765',
      expiryDate: '09/24',
      isDefault: false,
    },
  ];

  const handleBackPress = () => {
    router.back();
  };

  const handlePaymentSelection = (id) => {
    setSelectedMethod(id);
  };

  const handleAddCard = () => {
    console.log('Add new payment method');
  };

  const handleConfirmPayment = () => {
    // In a real app, this would process the payment
    // Simulate successful payment and navigate to QR screen
    setTimeout(() => {
      router.push('/qrCode/1');
    }, 1000);
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
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        
        <View style={styles.paymentMethodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentCard, 
                selectedMethod === method.id && styles.selectedPaymentCard
              ]}
              onPress={() => handlePaymentSelection(method.id)}
            >
              <View style={styles.cardInfoContainer}>
                <View style={styles.cardTypeContainer}>
                  <Image 
                    source={{ 
                      uri: method.type === 'visa' 
                        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png'
                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png'
                    }} 
                    style={styles.cardTypeImage} 
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardDetails}>
                  <Text style={styles.cardNumberText}>•••• {method.lastFour}</Text>
                  <Text style={styles.cardExpiryText}>Expires {method.expiryDate}</Text>
                </View>
              </View>
              <View style={[
                styles.radioButton, 
                selectedMethod === method.id && styles.radioButtonSelected
              ]}>
                {selectedMethod === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={styles.addPaymentButton}
            onPress={handleAddCard}
          >
            <Plus size={20} color={Colors.primary[700]} />
            <Text style={styles.addPaymentText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Booking Cost</Text>
              <Text style={styles.summaryValue}>$16.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee</Text>
              <Text style={styles.summaryValue}>$1.50</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>$17.50</Text>
            </View>
          </View>
        </View>

        <View style={styles.promoContainer}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoInputContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              placeholderTextColor={Colors.neutral[400]}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.paymentButton}
          onPress={handleConfirmPayment}
        >
          <CreditCard size={20} color="#fff" />
          <Text style={styles.paymentButtonText}>Pay $17.50</Text>
        </TouchableOpacity>
        <Text style={styles.secureText}>
          Your payment information is secure and encrypted
        </Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 16,
  },
  paymentMethodsContainer: {
    marginBottom: 24,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  selectedPaymentCard: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  cardInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTypeContainer: {
    width: 50,
    height: 30,
    marginRight: 12,
    justifyContent: 'center',
  },
  cardTypeImage: {
    width: '100%',
    height: '100%',
  },
  cardDetails: {
    justifyContent: 'center',
  },
  cardNumberText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  cardExpiryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.primary[600],
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary[600],
  },
  addPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary[400],
  },
  addPaymentText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary[700],
    marginLeft: 8,
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.neutral[600],
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: Colors.neutral[800],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[300],
    marginVertical: 12,
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.primary[700],
  },
  promoContainer: {
    marginBottom: 40,
  },
  promoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.neutral[100],
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[800],
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    borderRightWidth: 0,
  },
  applyButton: {
    height: 50,
    backgroundColor: Colors.primary[700],
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[50],
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  paymentButton: {
    backgroundColor: Colors.primary[700],
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  paymentButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[50],
    marginLeft: 8,
  },
  secureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});