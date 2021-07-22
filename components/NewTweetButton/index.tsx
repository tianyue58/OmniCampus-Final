import React from 'react'
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const NewTweetButton = () => {

    const navigation = useNavigation();
    const onPress = ()=> {
        navigation.navigate('NewTweet');
    }
    return (
        <TouchableOpacity 
            activeOpacity={0.6}
            style={styles.button} 
            onPress={onPress}>
            <AntDesign name={'plus'} size={30} color='white' />
        </TouchableOpacity>
    )
}
    

export default NewTweetButton;