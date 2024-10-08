import { View, Text, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../Theme/Index'
import { useNavigation } from '@react-navigation/native'
import { image185 } from '../API/movieDB'


var { width, height } = Dimensions.get('window')

export default function MovieList({ title, data, hideSeeAll }) {

    const navigation = useNavigation();

    return (
        <View className={'mb-8 space-y-4'}>
            <View className={'mx-4 flex-row justify-between items-center'}>
                <Text className={'text-white text-xl'}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text}>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}
                            >
                                <View className={'space-y-1 mr-4'}>
                                    <Image
                                        source={{uri: image185(item.poster_path)}}
                                        style={{ width: width * 0.33, height: height * 0.22 }}
                                        className={'rounded-2xl'}
                                    />
                                    <Text className={'text-neutral-300 ml-1'}>
                                        {
                                            item.title.length> 14 ? item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}