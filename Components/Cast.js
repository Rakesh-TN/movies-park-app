import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function Cast({cast, navigation}) {
    let personName = 'Robert Downey Jr'
    let CharacterName = 'Iron Man'
  return (
    <View className={'my-6'}>
      <Text className={'text-white text-lg mx-4 mb-5'}>Top Cast</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal:15 }}
      >
        {
            cast && cast.map((person, index) => {
                return(
                    <TouchableOpacity key={index} className={'mr-4 items-center'} onPress={() => navigation.navigate('Person', person)} >
                        <View className={'overflow-hidden rounded-full h-20 w-20 border border-neutral-500'}>
                            <Image source={require('../assets/rdj.jpg')} className={'rounded-xl h-24 w-20'} />
                        </View>
                        <Text className={'text-white text-xs mt-1'}>{ CharacterName.length>10? CharacterName.slice(0,10)+'...': CharacterName }</Text>
                        <Text className={'text-neutral-400 text-xs mt-1'}>{ personName.length>10? personName.slice(0,10)+'...': personName }</Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </View>
  )
}