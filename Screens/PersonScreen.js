import { View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { styles, theme } from '../Theme/Index'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../Components/MovieList'


var { width, height } = Dimensions.get('window')

export default function PersonScreen() {

    const navigation = useNavigation()
    const [isFavorite, toggleFavorite] = useState(false)
    const [ personMovies, setPersonMovies ] = useState([1,2,3,4])


    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className={'flex-1 bg-neutral-900 pt-10'}>
            <SafeAreaView className={'z-20 w-full flex-row justify-between items-center px-4 '}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className={'rounded-lg p-1'}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)} className={'rounded-lg p-1'}>
                    <HeartIcon size={30} color={isFavorite ? theme.background : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>
            <View>
                <View className={'flex-row justify-center'}
                    style={{
                        shadowColor: 'gray',
                        shadowRadius: 40,
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 1
                    }}>
                    <View className={'items-center rounded-full overflow-hidden h-80 w-80 border-2 border-neutral-500'}>
                        <Image source={require('../assets/rdj.jpg')} style={{ height: height * 0.5, width: width * 0.8 }} />
                    </View>
                </View>
                <View className={'mt-6'}>
                    <Text className={'text-3xl text-white font-bold text-center'}>Robert Downey Jr</Text>
                    <Text className={'text-base text-neutral-500 text-center'}>Malibu, California</Text>
                </View>
                <View className={'mx-3 p-4 mt-6 flex-row justify-between items-center  bg-neutral-700 rounded-full'}>
                    <View className={'border-r-2 border-r-neutral-400 px-2 items-center'}>
                        <Text className={'text-white font-semibold'}>Gender</Text>
                        <Text className={'text-neutral-300 text-sm'}>Male</Text>
                    </View>
                    <View className={'border-r-2 border-r-neutral-400 px-2 items-center '}>
                        <Text className={'text-white font-semibold'}>Birthday</Text>
                        <Text className={'text-neutral-300 text-sm'}>04 Apr 1965</Text>
                    </View>
                    <View className={'border-r-2 border-r-neutral-400 px-2 items-center '}>
                        <Text className={'text-white font-semibold'}>Known for</Text>
                        <Text className={'text-neutral-300 text-sm'}>Acting</Text>
                    </View>
                    <View className={'px-2 items-center'}>
                        <Text className={'text-white font-semibold '}>Popularity</Text>
                        <Text className={'text-neutral-300 text-sm'}>64.23</Text>
                    </View>
                </View>
                <View className={'my-6 mx-4 space-y-2'}>
                    <Text className={'text-white text-lg'}>Biography</Text>
                    <Text className={'text-neutral-300 tracking-wide'}>Robert John Downey Jr. (born April 4, 1965) is an American actor.
                        His films as a leading actor have grossed over $14 billion worldwide,
                        making him one of the highest-grossing actors of all time.
                        Downey's career has been characterized by some early success,
                        a period of drug-related problems and run-ins with the law,
                        and a surge in popular and commercial success in the 2000s.
                        In 2008, Downey was named by Time magazine as one of the 100
                        most influential people in the world. From 2013 to 2015,
                        he was listed by Forbes as Hollywood's highest-paid actor.</Text>
                </View>
                <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
            </View>
        </ScrollView>
    )
}