import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../Theme/Index'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../Components/Cast'
import MovieList from '../Components/MovieList'
import Loading from '../Components/Loading'
import { fetchMoviesCredits, fetchMoviesDetails, fetchSimilarMoviesDetails, image500 } from '../API/movieDB'

var { width, height } = Dimensions.get('window')

export default function MoviesScreen() {

    let movieName = 'Justice League'

    const route = useRoute();
    const navigation = useNavigation();
    const [isFavorite, toggleFavorite] = useState(false);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [movies, setMovies] = useState({});
    const [loading, setLoading] = useState(true);
    
    // Fetch the movie ID from route params
    const movieId = route.params?.id || 'defaultId'; // replace 'defaultId' with an appropriate fallback

    useEffect(() => {
        if (movieId) {
            setLoading(true);
            getMoviesDetails(movieId);
            getMoviesCredits(movieId);
            getSimilarMovies(movieId);
        }
    }, [movieId]);

    const getMoviesDetails = async (id) => {
            const data = await fetchMoviesDetails(id);
            // console.log('Got Movies:', data);
            if (data) setMovies(data);
            setLoading(false)
    };
    const getMoviesCredits = async (id) => {
        const data = await fetchMoviesCredits(id);
        // console.log('Movie Credits : ', data)
        if (data && data.cast) setCast(data.cast);
    }
    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMoviesDetails(id);
        // console.log('Movie Credits : ', data)
        if (data && data.results) setSimilarMovies(data.results);
    }

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
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                // source={require('../assets/DC.jpg')}
                                source={{uri: image500(movies?.poster_path)}} 
                                style={{ width, height: height * 0.7 }} />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{ width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className={'absolute bottom-0'}
                            />
                        </View>
                    )
                }

            </View>
            <View style={{ marginTop: -(height * 0.20) }}>
                <Text className={'text-white text-2xl text-center font-bold tracking-wider'}>{movies?.title}</Text>
{ movies?.id?(                <Text className={'text-neutral-400 text-lg text-center font-semibold'}>{movies?.status} • {movies?.release_date?.split('-')[0]} • {movies?.runtime} min</Text>
): null}
                <View className={'flex-row justify-center mx-4 space-x-2'}>
                    {
                        movies?.genres?.map((genre, index)=>{
                            let showDot = index+1 != movies.genres.length;
                            return(
                                <Text key={index} className={'text-neutral-400 text-base text-center font-semibold'}>
                                    {genre?.name} {showDot?" •": null}
                                </Text>
                            )
                        })
                    }
                </View>
                <Text className={'text-neutral-400 mx-4 tracking-wide'}>
                    {
                        movies?.overview
                    }
                </Text>
            </View>

            {cast.length>0 &&<Cast navigation={navigation} cast={cast} />}

            {similarMovies.length>0 &&<MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />}

        </ScrollView>
    )
}