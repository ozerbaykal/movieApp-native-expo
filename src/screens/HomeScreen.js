import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcominMovies } from '../api/moviedb';

const ios = Platform.OS == "ios";
const HomeScreen = () => {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation()

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();

    }, [])
    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();

        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcominMovies();

        if (data && data.results) setUpcoming(data.results);

    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();

        if (data && data.results) setTopRated(data.results);

    }
    return (
        <View className="flex-1 bg-neutral-800">
            {/* search bar and logo */}
            <SafeAreaView className={ios ? "-mb-2" : 'mb-3'}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies

                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>

                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>


                </View>

            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        {/* Tranding movies carousel */}
                        {trending.length > 0 && <TrendingMovies data={trending} />}

                        {/* upcoming movies row */}
                        <MovieList title={"UpComing Movies"} data={upcoming} />
                        {/*Top Rated Movies row */}

                        <MovieList title={"Top Rated"} data={topRated} />



                    </ScrollView>

                )
            }


        </View>
    )
}

export default HomeScreen;