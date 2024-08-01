import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ShimmerPlaceHolder from './ShimmerPlaceholder';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width: windowWidth } = Dimensions.get('window');

  return (
    <View>
      <Carousel
        loop={images.length > 1}
        width={windowWidth * 0.9}
        height={250}
        autoPlay={images.length > 1 && !isLoading}
        data={images}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <ShimmerPlaceHolder
              style={styles.imagePlaceholder}
              visible={!isLoading}
            >
              <Image
                source={{ uri: item }}
                style={styles.image}
                onLoad={() => setIsLoading(false)}
              />
            </ShimmerPlaceHolder>
          </View>
        )}
      />
      {images.length > 1 && (<View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dotsContainer: {
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000000',
  },
  inactiveDot: {
    backgroundColor: '#c0c0c0',
  },
});

export default ImageCarousel;