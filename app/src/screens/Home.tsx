import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import ProductCard from '../components/ProductCard';

const categories = ['foods', 'drinks', 'snacks', 'sauces', 'vegans']

const Home = ({ navigation }: { navigation: any }) => {
    const [category, setCategory] = useState<string>('foods')

    return (
        <View className='pt-[50px] pl-[50px] pb-[40px] flex-1 bg-[#EDEDED]'>

            <View className="justify-between flex-row pr-[40px]">
                <TouchableOpacity>
                    <Feather name="menu" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('cart')
                }}>
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
                <ScrollView className='flex flex-row mt-[36px]
                ' horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        categories.map((cgy) => (
                            <TouchableOpacity onPress={() => {
                                setCategory(cgy)
                            }} className={`px-[20px] py-[10px] ${category == cgy ? 'border-b-[3px] border-solid border-primary' : 'border-0'}`}>
                                <Text className={`capitalize  ${category == cgy ? 'text-primary' : 'text-[#9A9A9D]'} font-[normal] text-[17px] `}>
                                    {cgy}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>

            <View>
                <ScrollView className='flex flex-row mt-[24px] -ml-[30px]' horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        [
                            {
                                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                                title: 'Veggie tomato mix',
                                price: 1900
                            },
                            {
                                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                                title: 'Veggie tomato mix',
                                price: 1900
                            },
                            {
                                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                                title: 'Veggie tomato mix',
                                price: 1900
                            },
                            {
                                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
                                title: 'Veggie tomato mix',
                                price: 1900
                            }
                        ]
                            .map(({ img, title, price }) => (
                                <ProductCard navigation={navigation} title={title} price={price} img={img} isSearchItem={false} />
                            ))
                    }
                </ScrollView>
            </View>

            <View className='mt-auto flex-row justify-between pr-[50px]'>
                <TouchableOpacity>
                    <Entypo name="home" size={24} color="#FA4A0C" />
                </TouchableOpacity>
                <TouchableOpacity className='opacity-30'>
                    <Feather name="heart" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className='opacity-30'>
                    <MaterialCommunityIcons name="account-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className='opacity-30'>
                    <MaterialIcons name="history" size={24} color="black" />
                </TouchableOpacity>
            </View>


            <StatusBar style='dark' />
        </View>
    )
}

export default Home