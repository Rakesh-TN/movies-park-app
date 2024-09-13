import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/outline'


var { width, height } = Dimensions.get('window')


export default function SearchScreen() {

    const navigation = useNavigation()
    const [results, setResults] = useState([1,2])
    let movieName = 'Deadpool and Wolverine'

    return (
        <SafeAreaView className={'bg-neutral-800 pt-10 flex-1'}>
            <View className={'mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'}>
                <TextInput
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
                                            source={require('../assets/Deadpool.jpeg')}
                                            style={{ width: width * 0.44, height: height * 0.3 }} />
                                        <Text className={'text-neutral-300 ml-1'}>
                                            {
                                                movieName.length > 22 ? movieName.slice(0, 22) + '...' : movieName
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