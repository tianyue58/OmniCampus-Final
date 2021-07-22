import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const Task = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
              <View style={styles.square}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}


export default Task;

const styles = StyleSheet.create({
    
    item: {
        backgroundColor: '#e7f6f0',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        
       
        
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    
    square: {
        width: 24,
        height: 24,
        backgroundColor: Colors.light.tint,
        opacity: 0.5,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: 600,
    }, 
    circular: {
        width: 12,
        height: 12,
        borderRadius: 5,
        borderColor: Colors.light.tint,
        borderWidth: 2,
    }
  });
  