import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-get-random-values';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


import Amplify, {
  Auth,
  API, 
  graphqlOperation
} from 'aws-amplify';
import config from './src/aws-exports';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
import { withAuthenticator } from 'aws-amplify-react-native'
Amplify.configure(config)

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return 'https://tse1-mm.cn.bing.net/th/id/OIP-C.aVdXHcvoJZ9XdEj-y0y4aAHaEj?w=296&h=183&c=7&o=5&dpr=2&pid=1.7'
  }
  const saveUserToDB = async (user) => {
    console.log(user);
    await API.graphql(graphqlOperation(createUser, {input: user}));
  }

  useEffect(() => {
    const updateUser = async () => {
      //Get current auth user
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      
      if(userInfo) {
        //check if user alr exists in database
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub}));
        console.log(userData);
        if(!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),
          }
          await saveUserToDB(user);
        } else {
          console.log("User alr existed");
        }
      }
      

      //if it doesn't, create user in db

    }
    updateUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
