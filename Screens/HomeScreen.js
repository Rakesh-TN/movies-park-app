import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../Theme/Index'
import TrendingMovies from '../Components/TrendingMovies'
import MovieList from '../Components/MovieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../Components/Loading'
import { fetchTrendingMovies } from '../API/movieDB'
import { fetchUpcomingMovies } from '../API/movieDB'
import { fetchTopRatedMovies } from '../API/movieDB'



export default function HomeScreen() {
    const [trending, setTrending] = useState([])
    const [upcoming, SetUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()

    },[])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        // console.log('Got Trending : ', data);
        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        // console.log('Got upcoming : ', data);
        if (data && data.results) SetUpcoming(data.results);
        setLoading(false)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        // console.log('Got TopRated : ', data);
        if (data && data.results) setTopRated(data.results);
        setLoading(false)
    }

    return (
        <View className={'flex-1 bg-neutral-800'}>
            <SafeAreaView className={'mb-2'}>
                <StatusBar style='light' />
                <View className={'flex-row justify-between items-center mx-4'}>
                    <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
                    <Text className={'text-white text-2xl'}>Movies <Text style={styles.text}>Park</Text></Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                        { trending.length>0 &&<TrendingMovies data={trending} />}
                        { upcoming.length>0 &&<MovieList title='Upcoming' data={upcoming} />}
                        { topRated.length>0 &&<MovieList title='Top Rated' data={topRated} />}
                    </ScrollView>
                )
            }
        </View>
    )
}