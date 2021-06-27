import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png'
import { styles } from './styles'

import { ButtonIcon } from '../../components/ButtonIcom';
import  { BackGround }  from '../../components/BackGround';
import { theme } from '../../global/styles/theme';


export function SignIn() {

  const { loading, signIn } = useAuth();

  async function handleSigIn() {
    try {
      await signIn()
    } catch(error) {
      Alert.alert(error)
    }
  }

  return(
    <BackGround>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          resizeMode='stretch'
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.tittle}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas
          </Text>
          <Text style={styles.subtittle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos
          </Text>

          {
            loading
              ? 
                <ActivityIndicator color={theme.colors.primary} />
              :
                <ButtonIcon
                  title="Entrar com Discord"
                  onPress={handleSigIn}
                />
          }
        </View>
      </View>
    </BackGround>  
  )
}