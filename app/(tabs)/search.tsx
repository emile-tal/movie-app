import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { fetchMovies } from "../services/api";
import { updateSearchCount } from "../services/appwrite";
import useFetch from "../services/useFetch";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset
    } = useFetch(() => fetchMovies(searchQuery), false);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies()
                if (movies && movies?.[0]) {
                    await updateSearchCount(searchQuery, movies[0])
                }
            } else {
                reset()
            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [searchQuery])

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="flex-row justify-center w-full mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>
                        <View className="my-5">
                            <SearchBar
                                placeholder="Search"
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)} />
                        </View>
                        {moviesLoading ? (
                            <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
                        ) : moviesError ? (
                            <Text className="text-red-500 px-5 my-3">{`Error: ${moviesError?.message}`}</Text>
                        ) : searchQuery.trim() && movies?.length > 0 && (
                            <Text className="text-xl text-white font-bold">
                                Search results for <Text className="text-accent">{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchQuery.trim() ? 'No movies found.' : 'Search for a movie'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
}
