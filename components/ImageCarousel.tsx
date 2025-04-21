import { useState, useRef } from 'react';
import { StyleSheet, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

interface ImageCarouselProps {
  images: string[];
}

const { width } = Dimensions.get('window');

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  const handleDotPress = (index) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationDotActive
            ]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    width,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral[300],
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.primary[500],
    width: 16,
  },
});