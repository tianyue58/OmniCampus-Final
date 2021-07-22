import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Platform, Image } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid');
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Feed from '../components/Feed';
import tweets from '../data/tweets';
import NewTweetButton from '../components/NewTweetButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import ProfilePicture from '../components/ProfilePicture';
import { API, graphqlOperation, Auth, Storage} from 'aws-amplify';
import {createTweet} from '../src/graphql/mutations';
import { useNavigation } from '@react-navigation/native';
import { goBack } from '@react-navigation/routers/lib/typescript/src/CommonActions';
import * as ImagePicker from 'expo-image-picker';


export default function NewTweetScreen() {
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  

  const navigation = useNavigation();

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    
    getPermissionAsync()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(imageUrl);

      const blob = await response.blob();

      const urlParts = imageUrl.split('.');

      const extension = urlParts[urlParts.length - 1];
      
      const key = `${uuidv4()}.${extension}`;
      
      await Storage.put(key, blob);

      return key;

    } catch(e) {
      console.log(e);
    }
  }


    const onPostTweet = async() => {
      let image;
      if (!!imageUrl) {
        image = await uploadImage();
      }
      
      
      
        try {
          const currentUser = await Auth.currentAuthenticatedUser({bypassCache: true});
          
          const newTweet = {
            content: tweet,
            image,
            userID: currentUser.attributes.sub,
          }
          await API.graphql(graphqlOperation(createTweet, {input: newTweet}));
          navigation.goBack();
        } catch(e) {
            console.log(e);
        }
        return '';
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name='close' size={30} color={Colors.light.tint} />
        </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={onPostTweet}>
              <Text style={styles.buttonText}>
                  Post
              </Text>
          </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
          <ProfilePicture image={'https://tse1-mm.cn.bing.net/th/id/OIP-C.aVdXHcvoJZ9XdEj-y0y4aAHaEj?w=296&h=183&c=7&o=5&dpr=2&pid=1.7'} />
            <View style={styles.inputsContainer}>
            <TextInput 
                value={tweet}
                onChangeText={(value)=>setTweet(value)}
                multiline={true}
                numberOfLines={3}
                
                style={styles.tweetInput}
                placeholder="Put down your thoughts."
            />
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.pickImage}>Pick An Image</Text>
            </TouchableOpacity>
            <Image source={{uri: imageUrl}} style={styles.image}/>
            </View>
            
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
   
    
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 20,
  },
  buttonText: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      color: 'white',
     fontWeight: 'bold',
     fontSize: 15,
  },
  headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: 15,
  },
  tweetInput: {
    height: 100,
    maxHeight: 300,
    fontSize: 16,
  },
  imageInput: {

  },
  newTweetContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  inputsContainer: {
    marginLeft: 10,
    
  },
  pickImage: {
    fontSize: 18,
    color: Colors.light.tint,
    marginVertical:10,
  }, 
  image: {
    width: 220,
    height: 220,
  }


});
