import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from './src/firebaseConnetion';

console.disableYellowBox = true;

export default function App() {

  const [taskName, setTaskName] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = async () => {
    if (!taskName.length) return Alert.alert("Insira um nome para a tarefa")

    const id = Math.ceil(Math.random() * 100000)

    await setDoc(doc(db, "tasks", String(id)), {
      name: taskName
    });

    setTasks(prev => [...prev, { id: id, name: taskName }])
  }

  //TODO: você que vai implementar
  const editTask = () => { }

  //TODO: você que vai implementar
  const removeTask = () => { }

  const getAll = async () => {
    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);

    const list = []

    querySnapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        name: doc.data().name
      })
    })
    setTasks(list)
  }

  useEffect(() => {
    (async () => { getAll() })()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TODO</Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput value={taskName} onChangeText={e => setTaskName(e)} style={styles.input} placeholder='Digite o nome da tarefa' />
        <TouchableOpacity style={styles.addButton} onPress={() => addTask()}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => {
          return <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 24,
    alignItems: "center"
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 24
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginRight: 16
  },
  addButton: {
    backgroundColor: "#73FA8F",
    padding: 16,
    borderRadius: 16
  },
  addButtonText: {
    fontWeight: "bold",
    color: "#222"
  },
  item: {
    backgroundColor: "#ccc",
    marginVertical: 10,
    padding: 16,
    borderRadius: 8
  },
  itemText: {
    color: "#222",
    fontWeight: "bold"
  }
})