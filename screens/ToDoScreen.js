import React, {useState} from 'react';
import { TextInput, StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import EditScreenInfo from '../components/EditScreenInfo';
import Colors from '../constants/Colors';

import Task from '../components/Task';

export default function ToDoScreen() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
     
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completetask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  } 
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks 📝</Text>
        <View style={styles.items}>
          {
              taskItems.map((item, index) => {
                  return (
                      <TouchableOpacity key={index} onPress={()=>completetask(index)} >
                          <Task text={item} />
                      </TouchableOpacity>
                  )
              })
          }
        </View>
      </View>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios'? 'padding' : 'height'}
      style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder="Add A Task" 
        value={task}
        onChangeText={text => setTask(text)}/>
      
      <TouchableOpacity onPress={()=>handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
        </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  taskWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.tint
  }, 
  items: {
    marginTop: 26,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#eceff1',
    borderRadius: 30,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    width: 280,

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: Colors.light.tint,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderWidth: 1,

  },
  addText: {
    color: 'white',
  }
});
