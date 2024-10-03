import { Image, TouchableOpacity } from 'react-native'
import { View, Text, ScrollView, Touchable } from 'react-native'
import { fallbackPersonImage, image185 } from '../api/moviedb'


const Cast = ({ cast, navigation }) => {
    // const personName = " Keanu Reevs"
    // const characterName = "Tom Cruise"
    console.log(cast)
    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">TopCast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="mr-4 items-center"
                                onPress={() => navigation.navigate("Person", person)}

                            >

                                <View
                                    className="overflow-hidden rounded-full h-20  w-20 items-center border-neutral-500"
                                >
                                    <Image
                                        className="rounded-2xl h-24 w-20 "
                                        // source={require("../../assets/TomCruise.webp")}
                                        source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}

                                    />

                                </View>

                                <Text className="text-white text-xs mt-1">
                                    {
                                        //person?.character
                                        person?.character?.length > 10 ?
                                            person?.character.slice(0, 10) + "..." :
                                            person?.character

                                    }
                                </Text>
                                <Text className="text-neutral-400 text-xs mt-1">
                                    {
                                        //person?.original_name
                                        person?.original_name?.length > 10 ? person?.original_name?.slice(0, 10) + "..." : person?.original_name

                                    }
                                </Text>




                            </TouchableOpacity>
                        )
                    })


                }

            </ScrollView>
        </View>
    )
}

export default Cast