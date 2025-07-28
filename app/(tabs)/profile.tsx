import { icons } from "@/constants/icons";
import { Image, View } from "react-native";

export default function Profile() {
  return (
    <View className="flex-1 min-w-full min-h-full items-center justify-center bg-primary">
      <Image source={icons.person} className='size-10' tintColor='#fff' />
    </View>
  );
}
