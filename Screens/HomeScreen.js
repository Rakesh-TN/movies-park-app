import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../Theme/Index'
import TrendingMovies from '../Components/TrendingMovies'
import MovieList from '../Components/MovieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../Components/Loading'

export default function HomeScreen() {
    const [trending, setTrending] = useState([1, 2, 3, 4])
    const [upcoming, SetUpcoming] = useState([1, 2, 3, 4])
    const [topRated, setTopRated] = useState([1, 2, 3, 4])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();


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
                        <TrendingMovies data={trending} />
                        <MovieList title='Upcoming' data={upcoming} />
                        <MovieList title='Top Rated' data={topRated} />
                    </ScrollView>
                )
            }
        </View>
    )
}