import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../Theme/Index'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../Components/Cast'
import MovieList from '../Components/MovieList'

var { width, height } = Dimensions.get('window')

export default function MoviesScreen() {

    let movieName = 'Justice League'

    const { param } = useRoute()
    const navigation = useNavigation()
    const [isFavorite, toggleFavorite] = useState(false)
    const [ cast, setCast ] = useState([1,2,3,4,5,6])
    const [ similarMovies, setSimilarMovies ] = useState([1,2,3,4])

    useEffect(() => {

    }, []) // if remove the item to check the Output
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className={'flex-1 bg-neutral-900 pt-10'}
        >
            <View className={'w-full'}>
                <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4 '}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className={'rounded-lg p-1'}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)} className={'rounded-lg p-1'}>
                        <HeartIcon size={30} color={isFavorite ? theme.background : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                <View>
                    <Image
                        source={require('../assets/DC.jpg')} style={{ width, height: height * 0.7 }} />
                    <LinearGradient
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                        style={{ width, height: height * 0.40 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className={'absolute bottom-0'}
                    />
                </View>
            </View>
            <View style={{ marginTop: -(height * 0.20) }}>
                <Text className={'text-white text-2xl text-center font-bold tracking-wider'}>{movieName}</Text>
                <Text className={'text-neutral-400 text-lg text-center font-semibold'}>Released • 2017 • 120 min</Text>
                <View className={'flex-row justify-center mx-4 space-x-2'}>
                    <Text className={'text-neutral-400 text-base text-center font-semibold'}>Action •</Text>
                    <Text className={'text-neutral-400 text-base text-center font-semibold'}>Adventure •</Text>
                    <Text className={'text-neutral-400 text-base text-center font-semibold'}>Sci-Fi •</Text>
                    <Text className={'text-neutral-400 text-base text-center font-semibold'}>Fantasy</Text>
                </View>
                <Text className={'text-neutral-400 mx-4 tracking-wide'}>
                Justice League is a 2017 American superhero film based on the DC Comics superhero team of the same name. Produced by Warner Bros. Pictures, DC Films, RatPac-Dune Entertainment,[b] Atlas Entertainment, 
                and Cruel and Unusual Films, and distributed by Warner Bros. Pictures, it is the fifth installment in the DC Extended Universe (DCEU). Directed by Zack Snyder who was replaced by Joss Whedon after Snyder 
                left the project and written by Chris Terrio and Joss Whedon, the film features an ensemble cast including Ben Affleck, Henry Cavill, Gal Gadot, Ezra Miller, Jason Momoa, Ray Fisher, Amy Adams, Jeremy Irons, 
                Diane Lane, Connie Nielsen, and J. K. Simmons. In the film, following the events of Batman v Superman: Dawn of Justice (2016) Batman and Wonder Woman recruit The Flash, Aquaman, and Cyborg after the death of 
                Superman to save the world from the catastrophic threat of Steppenwolf and his army of Parademons.
                </Text>
            </View>

            <Cast navigation={navigation} cast={cast} />

            <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />

        </ScrollView>
    )
}