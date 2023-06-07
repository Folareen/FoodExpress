import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import ProductCard from '../components/ProductCard';
import useSanityFetch from '../hooks/useSanityFetch';
import { FlatList } from 'react-native';
import { urlFor } from '../config/sanityClient';
import { Skeleton } from '@rneui/themed';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store';

const Home = ({ navigation }: { navigation: any }) => {
    const [category, setCategory] = useState<{ title: string, _id: string } | null>(null)

    const categories = useSanityFetch(`*[_type == "category"]
        | order(_createdAt asc){
            title,
            _id
        }
    `, [])


    const { data, loading, error } = useSanityFetch(`
        *[_type == "product" && category._ref == "${category?._id}" ]{
                    title,
                    slug,
                    cover_image,
                    images,
                    price,
                }
    `, [category])

    useEffect(() => {
        if (categories.data?.length > 0) {
            setCategory(categories.data[0])
        }
    }, [categories.data])


    const { quantity } = useSelector((state: RootState) => state.cart)



    return (
        <View className='pt-[50px] pl-[50px] pb-[20px] flex-1 bg-[#EDEDED]'>

            <View className="justify-between flex-row pr-[40px]">
                <TouchableOpacity>
                    <Feather name="menu" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('cart')
                }} className='relative' >
                    <Text className='bg-[#00000019] rounded-full absolute -top-4 -right-3 px-1.5 py-1 font-[bold]'>
                        {quantity}
                    </Text>
                    <Feather name="shopping-cart" size={24} color="black" style={{ opacity: 0.5 }} />
                </TouchableOpacity>
            </View>

            <Text className='text-[34px] font-[extrabold] leading-10 mt-[40px] mb-[28px]'>
                Delicious {'\n'}
                food for you
            </Text>

            <TouchableOpacity className='px-[35px] py-[20px] bg-[#e6e6e6] flex-row rounded-[30px] mr-[50px] items-center' onPress={() => {
                navigation.navigate('search')
            }}>
                <Feather name="search" size={24} color="black" />
                <Text className='ml-[15px] text-black opacity-50 text-[17px] font-[bold]'>
                    Search
                </Text>
            </TouchableOpacity>

            <View>
                {
                    categories.loading ?
                        <Skeleton animation="wave" width={Dimensions.get('screen').width} height={40} style={{ marginTop: 36 }} />
                        :
                        <ScrollView className='flex flex-row mt-[36px]
                ' horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                categories.data?.map((cgy) => (
                                    <TouchableOpacity onPress={() => {
                                        setCategory(cgy)
                                    }} className={`px-[20px] py-[10px] ${category?.title == cgy.title ? 'border-b-[3px] border-solid border-primary' : 'border-0'}`} key={cgy._id}>
                                        <Text className={`capitalize  ${category?.title == cgy.title ? 'text-primary' : 'text-[#9A9A9D]'} font-[normal] text-[17px] `}>
                                            {cgy.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                }

            </View>

            {
                (loading || categories.loading) ?
                    <View className=''>

                        <ScrollView horizontal style={{ marginTop: 24, marginLeft: -30, flexDirection: 'row', }} showsHorizontalScrollIndicator={false}>
                            <View className='w-[184px] '>
                                <Skeleton animation="wave" width={164} height={164} style={{ borderRadius: 164, marginBottom: -96, marginHorizontal: 15 }} />
                                <Skeleton animation="wave" width={Dimensions.get('screen').width / 2} height={250} style={{ borderRadius: 40 }} />
                            </View>
                            <View className='w-[184px] ml-12 '>
                                <Skeleton animation="wave" width={164} height={164} style={{ borderRadius: 164, marginBottom: -96, marginHorizontal: 15 }} />
                                <Skeleton animation="wave" width={Dimensions.get('screen').width / 2} height={250} style={{ borderRadius: 40 }} />
                            </View>
                        </ScrollView>
                    </View>
                    :
                    <FlatList
                        horizontal={data.length > 0}
                        showsHorizontalScrollIndicator={false}
                        className={`mt-[24px] -ml-[30px]`}
                        data={data}
                        keyExtractor={({ slug }) => slug.current}
                        renderItem={({ item: { title, slug, cover_image, images, price } }) => (
                            <ProductCard navigation={navigation} title={title} price={price} img={urlFor(cover_image?.asset).url()} images={images} isSearchItem={false} slug={slug.current} />
                        )}
                        ListEmptyComponent={() => (
                            <View className='!flex-1 items-center justify-center h-[200px] '>
                                <Text className='text-[28px] font-[bold]'>
                                    No item found
                                </Text>
                            </View>
                        )}
                    />
            }


            <View className='mt-auto flex-row justify-between pr-[50px] items-center '>
                <TouchableOpacity>
                    <Entypo name="home" size={24} color="#FA4A0C" />
                </TouchableOpacity>
                <TouchableOpacity className='opacity-30'>
                    <Feather name="heart" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className='opacity-30' onPress={() => {
                    navigation.navigate('account')
                }}>
                    <MaterialCommunityIcons name="account-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className='opacity-30' onPress={() => {
                    navigation.navigate('history')
                }}>
                    <MaterialIcons name="history" size={24} color="black" />
                </TouchableOpacity>
            </View>


            <StatusBar style='dark' />
        </View>
    )
}

export default Home