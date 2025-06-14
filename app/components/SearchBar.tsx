import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

interface SearchBarProps {
    onPress: () => void;
}

export default function SearchBar({ onPress }: SearchBarProps) {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />
            <TextInput
                onPress={onPress}
                placeholder="Search"
                value=""
                onChangeText={() => { }}
                placeholderTextColor="#a8b5db"
                className="flex-1 ml-2"
            />
        </View>
    )
}