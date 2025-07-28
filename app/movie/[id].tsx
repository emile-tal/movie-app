import { icons } from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchMovieDetails } from "../services/api";
import useFetch from "../services/useFetch";

interface MovieInfoProps {
    label: string;
    value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
    return (
        <View className='flex-col items-start justify-center mt-5'>
            <Text className='text-light-200 text-sm font-normal'>{label}</Text>
            <Text className='text-white text-sm font-bold'>{value || 'N/A'}</Text>
        </View>
    )
}

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))

    return (
        <View className="flex-1 bg-primary">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className="h-[550px] w-full" resizeMode="stretch" />
                </View>
                <View className='flex-col items-start justify-center mt-5 px-5'>
                    <Text className='text-white text-xl font-bold'>{movie?.title}</Text>
                    <View className='flex-row items-center gap-x-1 mt-2'>
                        <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
                        <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
                        <View className='flex-row items-center gap-x-1 mt-2 rounded-md py-1 px-2 bg-gray-800'>
                            <Image source={icons.star} className='size-4' />
                            <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0) / 10}</Text>
                            <Text className='text-light-200 text-sm'>({movie?.vote_count} votes)</Text>
                        </View>
                    </View>
                    <MovieInfo label='Overview' value={movie?.overview} />
                    <MovieInfo label='Genres' value={movie?.genres?.map((genre) => genre.name).join(' - ') || 'N/A'} />
                    <View className='flex flex-row justify-between w-1/2'>
                        <MovieInfo label='Budget' value={`$${movie?.budget / 1000000} million` || 'N/A'} />
                        <MovieInfo label='Revenue' value={`$${movie?.revenue / 1000000} million` || 'N/A'} />
                    </View>
                    <MovieInfo label='Production Companies' value={movie?.production_companies?.map((company) => company.name).join(' - ') || 'N/A'} />
                </View>
            </ScrollView>
            <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50' onPress={() => router.back()}>
                <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff' />
                <Text className='text-white text-base font-semibold'>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MovieDetails;