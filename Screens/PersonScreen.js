import { View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles, theme } from '../Theme/Index'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import MovieList from '../Components/MovieList'
import Loading from '../Components/Loading'
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../API/movieDB'


var { width, height } = Dimensions.get('window')

export default function PersonScreen() {

    const route = useRoute();
    const navigation = useNavigation()
    const [isFavorite, toggleFavorite] = useState(false)
    const [personMovies, setPersonMovies] = useState([])
    const [person, setPerson] = useState([])
    const [loading, setLoading] = useState(false)

    const movieId = route.params?.id || 'defaultId'; // replace 'defaultId' with an appropriate fallback
    useEffect(() => {
        setLoading(true)
        getPersonDetails(movieId)
        getPersonMovies(movieId)
    }, [movieId]);

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails()
        setLoading(false)
        if (data) setPerson(data)
    }
    const getPersonMovies = async id => {
        const data = await fetchPersonMovies()
        console.log("Person Movies :", data.cast)
        setLoading(false)
        if (data && data.cast) setPersonMovies(data.cast)
    }

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
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View className={'flex-row justify-center'}
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1
                            }}>
                            <View className={'items-center rounded-full overflow-hidden h-80 w-80 border-2 border-neutral-500'}>
                                <Image source={{uri: image342(person?.profile_path)}} style={{ height: height * 0.5, width: width * 0.8 }} />
                            </View>
                        </View>
                        <View className={'mt-6'}>
                            <Text className={'text-3xl text-white font-bold text-center'}>{person?.name || 'API Not Work'}</Text>
                            <Text className={'text-base text-neutral-500 text-center'}>{person?.place_of_birth || 'API Not Work'}</Text>
                        </View>
                        <View className={'mx-3 p-4 mt-6 flex-row justify-between items-center  bg-neutral-700 rounded-full'}>
                            <View className={'border-r-2 border-r-neutral-400 px-2 items-center'}>
                                <Text className={'text-white font-semibold'}>Gender</Text>
                                <Text className={'text-neutral-300 text-sm'}>{person?.gender==1? 'Female':'Male'}</Text>
                            </View>
                            <View className={'border-r-2 border-r-neutral-400 px-2 items-center '}>
                                <Text className={'text-white font-semibold'}>Birthday</Text>
                                <Text className={'text-neutral-300 text-sm'}>{person?.birthday || 'API Not Work'}</Text>
                            </View>
                            <View className={'border-r-2 border-r-neutral-400 px-2 items-center '}>
                                <Text className={'text-white font-semibold'}>Known for</Text>
                                <Text className={'text-neutral-300 text-sm'}>{person?.known_for_department || 'API Not Work'}</Text>
                            </View>
                            <View className={'px-2 items-center'}>
                                <Text className={'text-white font-semibold '}>Popularity</Text>
                                <Text className={'text-neutral-300 text-sm'}>{person?.popularity || 'API Not Work'}</Text>
                            </View>
                        </View>
                        <View className={'my-6 mx-4 space-y-2'}>
                            <Text className={'text-white text-lg'}>Biography</Text>
                            <Text className={'text-neutral-300 tracking-wide'}>
                                {
                                    person?.biography || 'API Not Work'
                                }
                            </Text>
                        </View>
                        {/* <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} /> */}
                    </View>
                )
            }

        </ScrollView>
    )
}