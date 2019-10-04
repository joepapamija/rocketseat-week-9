import React, {useState, useEffect} from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api'

import logo from '../assets/logo.png'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(()=>{
    AsyncStorage.getItem('user').then(user =>{
      if(user)
        navigation.navigate('List');
    })
  }, []);

  async function handlerSubmit(){
    const response = await api.post('/sessions', {email});
    const {_id} = response.data;

    AsyncStorage.setItem('user', _id);
    AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }
    return (
      <KeyboardAvoidingView behavior="padding" style={style.container}>
        <Image source={logo} />
        <View style={style.form}>
          <Text style={style.label}>Seu Email *</Text>
          <TextInput
            style={style.input}
            placeholder="seu e-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <Text style={style.label}>Tecnologias *</Text>
          <TextInput
            style={style.input}
            placeholder="Tecnologias de Interese"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={techs}
            onChangeText={setTechs}
          />
          </View>

          <TouchableOpacity onPress={handlerSubmit} style={style.button}>
            <Text style={style.buttonTex} >Encontrar Spots</Text>
          </TouchableOpacity>
        
      </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },

  label:{
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },

  input:{
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },

  buttonTex: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }

});