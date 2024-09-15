import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import Loading from '../Components/Loading'
import { debounce } from 'lodash'
import { image185, searchMovies } from '../API/movieDB'


var { width, height } = Dimensions.get('window')


export default function SearchScreen() {

    const navigation = useNavigation()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearch = value => {
        if(value && value.length){
            setLoading(true)
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false);
                // console.log('Got Movies :',data)
                setResults(data);
            })
        }else{
            setLoading(false)
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    return (
        <SafeAreaView className={'bg-neutral-800 pt-10 flex-1'}>
            <View className={'mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'}>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movies'
                    placeholderTextColor={'lightgrey'}
                    className={'pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Home')}
                    className={'rounded-full p-3 m-1 bg-neutral-500'}>
                    <XMarkIcon size='30' color={'white'} />
                </TouchableOpacity>
            </View>
            {
                loading? (
                    <Loading />
                ):
                results.length>0? (
                    <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                className={'space-y-3'}>
                <Text className={'text-white font-semibold ml-1'}>Result ({results.length})</Text>
                <View className={'flex-row justify-between flex-wrap'}>
                    {
                        results.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}
                                    onPress={() => navigation.push('Movie', item)}>
                                    <View className={'space-y-2 mb-4'}>
                                        <Image className={'rounded-3xl'}
                                            source={{ uri: image185() }}
                                            style={{ width: width * 0.44, height: height * 0.3 }} />
                                        <Text className={'text-neutral-300 ml-1'}>
                                            {
                                                item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                    </ScrollView>
                ):(
                    <View className={'flex-row justify-center'}>
                    <Image className={'h-80 w-80'}
                        source={require('../assets/movieTime.png')}/>
                    </View>
                )
            }
            
        </SafeAreaView>
    )
}