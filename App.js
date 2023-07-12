import { collection, doc, getDocs, query, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { db } from './src/firebaseConnetion'
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './src/style';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { create, useStore } from 'zustand';

console.disableYellowBox = true;

export default function App() {
  const [taskName, setTaskName] = useState("");
  const [concluida, setConcluida] = useState("A fazer");
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const useStore = create((set) => ({
    addTask: async () => {
      if (!taskName.length) return Alert.alert("Insira um nome para a tarefa");

      if (editingTaskId) {
        try {
          const taskRef = doc(db, 'tasks', editingTaskId);
          await updateDoc(taskRef, { name: taskName });
          console.log("Tarefa editada");
          refreshTasks();
        } catch (error) {
          console.log("Erro na edição: " + error);
        }

        setEditingTaskId(null);
      } else {
        const id = Math.ceil(Math.random() * 100000);

        await setDoc(doc(db, "tasks", String(id)), {
          name: taskName,
          concluida: concluida,
        });

        setTasks(prev => [...prev, { id: id, name: taskName, concluida: concluida }]);
      }

      Keyboard.dismiss();
      setTaskName('');
    },
    deleteTask: async (item) => {
      const id = String(item.id);

      try {
        await deleteDoc(doc(db, 'tasks', id));
        const updatedTasks = tasks.filter((task) => task.id !== id);
        console.log("Tarefa excluída com sucesso");
        setTasks(updatedTasks);
      } catch (error) {
        console.log("Erro: " + error);
      }
    },
    checkTask: async (item) => {
      const id = String(item.id);
      const taskRef = doc(db, 'tasks', id);

      try {
        await updateDoc(taskRef, { concluida: "OK" });
        console.log(item.name + " concluída com sucesso!!");
        refreshTasks();
      } catch (error) {
        console.log("Erro na atualização: " + error);
      }
    },
    editTask: (item) => {
      setTaskName(item.name);
      setEditingTaskId(item.id);
      inputRef.current.focus();
    }
  }));

  const refreshTasks = async () => {
    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);

    const list = [];

    querySnapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        name: doc.data().name,
        concluida: doc.data().concluida,
      });
    });

    setTasks(list);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const LeftAction = ({ item }) => {
    const handleDelete = () => {
      useStore.getState().deleteTask(item);
    };

    return (
      <View style={styles.leftAction}>
        <TouchableOpacity style={styles.delButn} onPress={handleDelete}>
          <FontAwesome name="trash" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  const RightAction = ({ item }) => {
    const handleEdit = () => {
      useStore.getState().editTask(item);
    };

    return (
      <View style={styles.rightAction}>
        <TouchableOpacity style={styles.edit} onPress={handleEdit}>
          <FontAwesome name="pencil-square-o" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.check} onPress={() => useStore.getState().checkTask(item)}>
          <FontAwesome name="check" size={25} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TASK</Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          value={taskName}
          onChangeText={setTaskName}
          style={styles.input}
          placeholder='Digite o nome da tarefa'
          ref={inputRef}
        />
        <TouchableOpacity style={styles.addButton} onPress={useStore.getState().addTask}>
          <FontAwesome name="share-square-o" size={30} color="#F92" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Swipeable
            renderLeftActions={() => <LeftAction item={item} />}
            renderRightActions={() => <RightAction item={item} />}
          >
            <View style={{
              marginVertical: 10,
              backgroundColor: item.concluida !== 'A fazer' ? "#ddaa" : "#ccc",
              padding: 16,
              borderRadius: 8,
              justifyContent: "center",
              borderRightWidth: 5,
              borderBottomWidth: 5,
              borderTopRightRadius: 20,
              borderRightRightRadius: 10,
              borderTopRightRadius: 5,
            }}>
              <Text style={styles.itemText}>
                <FontAwesome name="envira" size={15} color="black" />
                {' '}
                {item.name}
              </Text>
              <Text>{item.concluida}</Text>
            </View>
          </Swipeable>
        )}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 24
        }}
      />

    </GestureHandlerRootView>
  );
}
