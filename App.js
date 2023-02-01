import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
import app from './src/firebaseConnetion';

// console.disableYellowBox=true;

export default function App(){
  const [nome, setNome] = useState('Carregando...');
  const [idade, setIdade] = useState('');

  // useEffect(()=> {

  //   async function dados(){

  //     //Olheiro da nossa database
  //     await firebase.database().ref('usuarios/2').on('value', (snapshot) => {
  //       setNome(snapshot.val().nome);
  //       setIdade(snapshot.val().idade);
  //     });

  //     // await firebase.database().ref('nome').once('value', (snapshot)=> {
  //     //   setNome(snapshot.val());
  //     // });

  //   }

  //   dados();


  // }, []);

  return(
    <View style={{marginTop: 25}}>
      <Text style={{fontSize: 25}}>Olá {nome}</Text>
      <Text style={{fontSize: 25}}>Idade {idade}</Text>
    </View>
  );
}