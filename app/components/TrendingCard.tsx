import { images } from '@/constants/images'
import { TrendingMovie } from '@/interfaces/interfaces'
import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function TrendingCard({ movie, index }: { movie: TrendingMovie, index: number }) {

    return (
        <Link href={`/movie/${movie.movie_id}`} asChild>
            <TouchableOpacity className='relative w-32 pl-5'>
                <Image
                    source={{ uri: movie.poster }}
                    className='w-32 h-48 rounded-lg'
                    resizeMode='cover'
                />
                <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
                    <MaskedView maskElement={
                        <Text className='text-white text-6xl font-bold'>
                            {index + 1}
                        </Text>
                    }>
                        <Image source={images.rankingGradient} className='size-14' resizeMode='cover' />
                    </MaskedView>
                </View>
                <Text className='text-white text-sm font-bold mt-2' numberOfLines={2}>{movie.title}</Text>
            </TouchableOpacity>
        </Link>
    )
}