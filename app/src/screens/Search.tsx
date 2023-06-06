import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { AntDesign, Feather } from '@expo/vector-icons'
import useSanityFetch from '../hooks/useSanityFetch';
import { Skeleton } from '@rneui/themed';
import { Dimensions } from 'react-native';
import { urlFor } from '../config/sanityClient';


const Search = ({ navigation }: { navigation: any }) => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { data, loading, error } = useSanityFetch(`
        *[_type == "product" && title match "${searchTerm}"]{
                    title,
                    slug,
                    cover_image,
                    images,
                    price,
                }
    `, [searchTerm])


    const [products, setProducts] = useState<any[]>([])


    useEffect(() => {
        if (data.length > 0) {
            const newArray = data.reduce((acc, obj, index) => {
                if (index % 2 === 0) {
                    acc.push([obj]);
                } else {
                    acc[acc.length - 1].push(obj);
                }
                return acc;
            }, []);
            setProducts(newArray)
        }
    }, [data])


    return (
        <View className='flex-1 #EEEEEE'>
            <View className='mt-[72px] ml-[42px] mb-[35px] flex-row items-center'>
                <TouchableOpacity onPress={() => {
                    navigation.pop()
                }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <TextInput placeholder='Start typing...' className='ml-[35px] text-[17px] font-[bold] flex-1' placeholderTextColor={'#0000007f'} value={searchTerm} onChangeText={(text: string) => {
                    setSearchTerm(text)
                }} />
            </View>

            {
                (data.length > 0 || loading) ?


                    <View className='bg-white rounded-t-[30px] py-[35px] flex-1'>
                        <Text className='text-center font-[extrabold] text-[28px] mb-[40px] '>
                            Found {data.length} result{data.length > 1 ? 's' : ''}
                        </Text>


                        {
                            loading ?
                                <View style={{ marginTop: 24, marginLeft: -30, flexDirection: 'row' }}>
                                    <Skeleton animation="wave" width={Dimensions.get('screen').width / 2} height={250} style={{ borderRadius: 40 }} />
                                    <Skeleton animation="wave" width={Dimensions.get('screen').width / 2} height={250} style={{ marginLeft: 20, borderRadius: 40 }} />
                                </View>
                                :
                                <ScrollView>

                                    {products?.map((arr) => (
                                        <View className='flex-row'>
                                            <ProductCard images={arr[0]['images']} slug={arr[0]['slug'].current} navigation={navigation} title={arr[0]['title']} price={arr[0]['price']} img={urlFor(arr[0]['cover_image']?.asset).url()} isSearchItem={true} />
                                            {
                                                products.length % 2 == 0 && (
                                                    <ProductCard images={arr[0]['images']} slug={arr[0]['slug'].current} navigation={navigation} title={arr[1]['title']} price={arr[1]['price']} img={urlFor(arr[1]['cover_image']?.asset).url()} isSearchItem={true} />
                                                )
                                            }
                                        </View>
                                    ))
                                    }
                                </ScrollView>

                        }

                    </View>

                    :
                    <View className='flex-1 bg-[#F5F5F8] items-center justify-center'>
                        <Feather name="search" size={96} color="#C7C7C7" />
                        <Text className='text-[28px] font-[bold] mt-[30px] text-center'>
                            No item found
                        </Text>
                        <Text className='text-[17px] font-[normal] opacity-50 mt-[17px] text-center'>
                            Try searching the item with {'\n'}
                            a different keyword.
                        </Text>
                    </View>

            }
        </View>
    )
}

export default Search