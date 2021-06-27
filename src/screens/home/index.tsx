import React, { useState, useCallback } from "react";
import  { View, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import  { BackGround }  from '../../components/BackGround';

import { Profile } from "../../components/Profile";
import { Load } from "../../components/Load";

import { styles } from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";

export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    
    const navigation = useNavigation()

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', {guildSelected})
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage)
        }

        setLoading(false)
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();

    }, [category]))

    return(
        <BackGround>

            <View style={styles.header}>
                <Profile />
                <TouchableOpacity onPress={handleAppointmentCreate} activeOpacity={0.7}>
                    <ButtonAdd />
                </TouchableOpacity>
            </View>
            
            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            {
                loading ? <Load /> :
                <>
                    <ListHeader
                        title='Partidas agendadas'
                        subtitle={`Total ${appointments.length}`}
                    />

                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        style={styles.matches}
                        contentContainerStyle={{paddingBottom: 69}}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Appointment
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}    
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}   
                    />
                </>
            }
        </BackGround>
    );
}