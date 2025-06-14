import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const MovieDetails = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Movie Details</Text>
        </View>
    )
}

export default MovieDetails;