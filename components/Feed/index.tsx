import React, {useEffect, useState} from "react";
import { View, FlatList } from "react-native";
import { graphqlOperation, API  } from "aws-amplify";

import { listTweets } from "../../src/graphql/queries";
import Tweet from "../Tweet";
import { completion } from "yargs";

const Feed = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTweet = async () => {
        //get the tweet from backend and set them to state
        setLoading(true);
        try {
            const tweetsData = await API.graphql(graphqlOperation(listTweets));
            setTweets(tweetsData.data.listTweets.items);
        } catch(e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        
        
        fetchTweet();
    }, [])

    return (
        <View style={{width: '100%'}}>
       <FlatList 
        data={tweets} 
        renderItem={({item}) => <Tweet tweet={item}/>} 
        keyExtractor={(item) => item.id}
        refreshing= {loading}
        onRefresh={fetchTweet}
    /> 
    </View>
    )  
};

export default Feed;