
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { image500 } from '../api/moviedb';

export default function TrendingMovies({ data }) {
    var { width, height } = Dimensions.get('window');

    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate("Movie", item)

    }

    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <Carousel
                loop
                width={width}
                height={320}
                autoPlay={false}
                data={data}
                scrollAnimationDuration={1000}

                renderItem={({ item }) => <MovieCard item={item} width={width} handleClick={handleClick} />}
            />
        </View>
    );
}

const MovieCard = ({ item, width, handleClick, height }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                source={{ uri: image500(item.poster_path) }}
                style={{
                    width: width,
                    height: 320




                }}

                className="rounded-3xl object-contain w-full "


            />

        </TouchableWithoutFeedback>
    );
};