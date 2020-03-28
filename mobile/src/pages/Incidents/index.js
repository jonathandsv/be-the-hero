import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, FlatList, Button } from 'react-native';

import logoImg from '../../assets/logo.png';

import api from '../../services/api';

import styles from './styles';
export default function Incidents() {
    const navigation = useNavigation();
    
    const [incidents, setIncidents] = useState([{
        id: 28,
        title: 'Cadelinha Atropelada!',
        description: '',
        value: '120',
        ong_id: '7aab9a2d',
        name: 'APAD',
        email: 'conta@apad.com.br',
        whatsapp: '4444552215521',
        city: 'Aguas Lindas',
        uf: 'Goias'
      }]);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents() {
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: page
        });

        setIncidents(... incidents, ... response.data);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    async function acessar(){
        const json = [
            {
              id: 28,
              title: '654',
              description: '',
              value: '',
              ong_id: '7aab9a2d',
              name: 'APAD',
              email: 'conta@apad.com.br',
              whatsapp: '4444552215521',
              city: 'Aguas Lindas',
              uf: 'Goias'
            },
            {
              id: 70,
              title: 'teste de caso ',
              description: 'Cachorro louco',
              value: 150,
              ong_id: '7aab9a2d',
              name: 'APAD',
              email: 'conta@apad.com.br',
              whatsapp: '4444552215521',
              city: 'Aguas Lindas',
              uf: 'Goias'
            },
            {
              id: 71,
              title: 'Teste',
              description: 'testando ',
              value: 190,
              ong_id: '7aab9a2d',
              name: 'APAD',
              email: 'conta@apad.com.br',
              whatsapp: '4444552215521',
              city: 'Aguas Lindas',
              uf: 'Goias'
            },
            {
              id: 72,
              title: 'Cirurgia ',
              description: 'Cachorro louco',
              value: 200,
              ong_id: '7aab9a2d',
              name: 'APAD',
              email: 'conta@apad.com.br',
              whatsapp: '4444552215521',
              city: 'Aguas Lindas',
              uf: 'Goias'
            },
            {
              id: 73,
              title: 'Caso DE teste',
              description: 'Detalhes do caso',
              value: 120,
              ong_id: '7aab9a2d',
              name: 'APAD',
              email: 'conta@apad.com.br',
              whatsapp: '4444552215521',
              city: 'Aguas Lindas',
              uf: 'Goias'
            }
          ];

        // const resp = JSON.parse(json)
           
        setRest(json);
    }

    useEffect(() => {
        loadIncidents()
    }, []);

    function navigationToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>
            
            
            <FlatList 
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigationToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#E02041'/>
                        </TouchableOpacity>
                    </View>
                )}
            />       
  
        </View>
    );
};
