import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import Carousel from '@zhenyudu/react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { image500 } from '../API/movieDB'

var { width, height } = Dimensions.get('window')

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }
    return (
        <View className={'mb-8'}>
            <Text className={'text-white text-2xl mx-4 mb-5'}>Trending</Text>
            <Carousel
                data={data}
                renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width*0.62}
            />
        </View>
    )
}

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image 
                source={{uri: image500(item.poster_path)}} 
                style={{
                    width: width*0.6,
                    height: height*0.4
                }} 
                className={'rounded-2xl'}
                />
        </TouchableWithoutFeedback>
    )
}