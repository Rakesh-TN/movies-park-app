import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../Theme/Index'
import TrendingMovies from '../Components/TrendingMovies'
import MovieList from '../Components/MovieList'

export default function HomeScreen() {
    const [ trending, setTrending ] = useState([1,2,3,4])
    const [ upcoming, SetUpcoming ] = useState([1,2,3,4])
    const [ topRated, setTopRated ] = useState([1,2,3,4])

    return (
        <View className={'flex-1 bg-neutral-800'}>
            <SafeAreaView className={'mb-2'}>
            <StatusBar style='light'/>
                <View className={'flex-row justify-between items-center mx-4'}>
                <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
                <Text className={'text-white text-2xl'}>Movies <Text style={styles.text}>Park</Text></Text>
                <TouchableOpacity>
                    <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' /> 
                </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                <TrendingMovies data={trending}/>
                <MovieList title='Upcoming' data={upcoming} />
            </ScrollView>
        </View>
    )
}