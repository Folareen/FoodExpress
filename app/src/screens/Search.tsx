import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { AntDesign } from '@expo/vector-icons'

const data = [
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

const Search = ({ navigation }: { navigation: any }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const newArray = data.reduce((acc, obj, index) => {
            if (index % 2 === 0) {
                acc.push([obj]);
            } else {
                acc[acc.length - 1].push(obj);
            }
            return acc;
        }, []);
        setProducts(newArray)
    }, [])


    return (
        <View className='flex-1 #EEEEEE'>
            <View className='mt-[72px] ml-[42px] mb-[35px] flex-row items-center'>
                <TouchableOpacity onPress={() => {
                    navigation.pop()
                }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <TextInput placeholder='Start typing...' className='ml-[35px] text-[17px] font-bold flex-1' placeholderTextColor={'#0000007f'} />
            </View>

            <View className='bg-white rounded-t-[30px] py-[35px]'>
                <Text className='text-center font-[extrabold] text-[28px] mb-[40px] '>
                    Found 6 results
                </Text>

                <ScrollView>
                    {products.map((arr) => (
                        <View className='flex-row'>
                            <ProductCard navigation={navigation} title={arr[0]['title']} price={arr[0]['price']} img={arr[0]['img']} isSearchItem={true} />
                            <ProductCard navigation={navigation} title={arr[1]['title']} price={arr[1]['price']} img={arr[1]['img']} isSearchItem={true} />
                        </View>
                    ))
                    }
                </ScrollView>

            </View>
        </View>
    )
}

export default Search