import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

type TabBarIconProps = {
    focused: boolean;
    icon: any;
    text: string;
}

const TabBarIcon = ({ focused, icon, text }: TabBarIconProps) => {
    if (focused) {
        return (
            <ImageBackground source={images.highlight} className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
                <Image source={icon} tintColor="#151312" className="size-5" />
                <Text className="text-secondary text-base font-semibold ml-2">{text}</Text>
            </ImageBackground>
        )
    } else {
        return (
            <View className="size-full justify-center items-center mt-4 rounded-full">
                <Image source={icon} tintColor="#A8B5DB" className="size-5" />
            </View>
        )
    }
}

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#0f0D23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0f0D23",
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon icon={icons.home} text="Home" focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon icon={icons.search} text="Search" focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon icon={icons.save} text="Saved" focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon icon={icons.person} text="Profile" focused={focused} />
                    )
                }}
            />
        </Tabs>
    )
}

export default Layout;