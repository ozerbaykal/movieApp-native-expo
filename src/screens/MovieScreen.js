import { View, Text, ScrollView, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'



import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/MovieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == "ios"
const topMargin = ios ? "" : "mt-3"

const MovieScreen = () => {
    const { params: item } = useRoute();
    const [isFavourite, toogleFavourite] = useState(false)
    const navigation = useNavigation();
    const [cast, setCast] = useState([1, 2, 3, 4, 5])
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5])
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    let movieName = "ant-MAn and the Wasp : Quantumania"
    useEffect(() => {
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)


    }, [item])

    const getMovieDetails = async id => {

        const data = await fetchMovieDetails(id);
        if (data) setMovie(data);
        setLoading(false)
    }
    const getMovieCredits = async id => {

        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast);

    }
    const getSimilarMovies = async id => {

        const data = await fetchSimilarMovies(id);
        if (data && data.results) setSimilarMovies(data.results);

    }
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"

        >
            {/* back button movie poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "#eab308" }} className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toogleFavourite(!isFavourite)}>
                        <HeartIcon size="35 " color={isFavourite ? theme.background : "white"} />
                    </TouchableOpacity>


                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                //source={require("../../assets/topgun.png")}
                                source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}

                            />
                            <LinearGradient
                                colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
                                style={{ width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0" />
                        </View>


                    )
                }


            </View>

            {/* Movie Details */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movie?.title}


                </Text>


                {/* status,relese,runtime */}
                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date?.split("-")[0]} • {movie?.runtime} min
                        </Text>

                    ) : null


                }




                {/* genres */}

                <View className="flex-row justify-center mx-4 spacex-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name}  {showDot ? "•" : null}
                                </Text>

                            )
                        })
                    }

                    {/* <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thrill •
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy
                    </Text> */}


                </View>
                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {
                        movie?.overview
                    }

                </Text>

            </View>
            {/* cast */}

            {cast.length > 0 && <Cast navigation={navigation} cast=
                {cast} />

            }

            {/* smilar movies */}
            {similarMovies.length > 0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
            }


        </ScrollView>
    )
}

export default MovieScreen