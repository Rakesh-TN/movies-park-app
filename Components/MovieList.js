import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { styles } from '../Theme/Index'
import { useNavigation } from '@react-navigation/native'


export default function MovieList({ title, data }) {

    let movieName = 'Deadpool'
    const navigation = useNavigation();

    return (
        <View className={'mb-8 space-y-4'}>
            <View className={'mx-4 flex-row justify-between items-center'}>
                <Text className={'text-white text-xl'}>{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                >
                    {
                        data.map((item, index)=> {
                            return(
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={() => navigation.navigate('Movie', item)}
                                >
                                    <Text className={'text-white ml-3'}>{movieName}</Text>
                                </TouchableWithoutFeedback>
                            )
                        }) 
                    }
                </ScrollView>
        </View>
    )
}