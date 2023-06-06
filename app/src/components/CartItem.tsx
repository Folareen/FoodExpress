import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import formatPrice from '../utils/formatPrice';

type CartItemProps = {
    prevCard: any,
    setPrevCard: any,
    img: string,
    title: string,
    price: number
}

const CartItem = ({ prevCard, setPrevCard, img, title, price }: CartItemProps) => {

    const cardRef = useRef(null)

    const closePrev = () => {
        if (prevCard != cardRef && prevCard != null) {
            prevCard.current.close()
        }
        setPrevCard(cardRef)
    };

    const renderRightActions = (progress: string, dragX: string) => {
        return (
            <View
                style={{
                    margin: 0,
                    alignItems: "center",
                    flexDirection: "row",
                    width: 120,
                    paddingHorizontal: 5,
                    marginRight: '10%',
                }}

            >
                <TouchableOpacity className='bg-primary p-[14px] rounded-full'>
                    <Feather name="heart" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className='bg-primary p-[14px] rounded-full ml-2'>
                    <MaterialIcons name="delete" size={24} color="white" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Swipeable
            ref={cardRef}
            renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX)
            }
            onSwipeableOpen={closePrev}

        >
            <View className=' w-4/5 mx-auto bg-white rounded-[20px] flex-row p-4' style={{
                shadowColor: '#00000065',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 5,
                marginBottom: 16,
            }}>
                <Image source={{ uri: img }} className='w-[69px] h-[69px] rounded-full' />
                <View className='flex-1 ml-[15px]'>
                    <Text className='text-[17px] font-bold mb-[16px]'>
                        {title}
                    </Text>
                    <View className='flex-row justify-between'>
                        <Text className='text-primary font-[bold] text-[15px] '>
                            &#8358;{formatPrice(price)}
                        </Text>
                        <View className='flex-row bg-primary rounded-[30px] items-center'>
                            <TouchableOpacity className='px-1.5'>
                                <AntDesign name="minus" size={18} color="white" />
                            </TouchableOpacity>
                            <Text className='text-[13px] text-white py-1'>
                                3
                            </Text>
                            <TouchableOpacity className='px-1.5'>
                                <AntDesign name="plus" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </Swipeable>
    )
}

export default CartItem