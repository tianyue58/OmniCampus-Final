import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, EvilIcons, AntDesign } from '@expo/vector-icons';
import { graphqlOperation, API, Auth } from 'aws-amplify';

import { TweetType } from '../../../../types';
import styles from './styles';
import { createLike, deleteLike } from '../../../../src/graphql/mutations';

export type FooterContainerProps = {
    tweet: TweetType,
}

const Footer = ({tweet}: FooterContainerProps) => {
    console.log(tweet);
    const [user, setUser] = useState(null);
    const [myLike, setMyLike] = useState(null);
    const [likesCount, setLikesCount] = useState(tweet.likes.items.length);
    const [myReport, setMyReport] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);

            const searchedLike = tweet.likes.items.find(
                (like) => like.userID === currentUser.attributes.sub
            );
            setMyLike(searchedLike);
        }
        fetchUser();
    }, [])

    const onLike = async () => {
        if (!user) {
            return;
        }

        if (!myLike) {
            await submitLike();
        } else {
            await removeLike();
        }
        
    }
    
    const onReport = async () => {
        setMyReport('smth');
        console.warn("Report sent to administrator.")
    }

    const submitLike = async () => {
        const like = {
            userID: user.attributes.sub,
            tweetID: tweet.id,
        }
        try {
            const res = await API.graphql(graphqlOperation(createLike, {input: like}))
            setMyLike(res.data.createLike);
            setLikesCount(likesCount + 1);
        } catch (e) {
            console.log(e);
        }
    }

    const removeLike = async () => {
        // const like = {
        //     userID: user.attributes.sub,
        //     tweetID: tweet.id,
        // }
        try {
            const res = await API.graphql(graphqlOperation(deleteLike, {input: {id: myLike.id}}))
            setMyLike(null);
            setLikesCount(likesCount - 1);
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onLike}>
                    <AntDesign name={!myLike ? "hearto" : "heart"} size={20} color={!myLike ?'grey': 'red'}/>
                </TouchableOpacity>
           
                <Text style={styles.number}>{likesCount}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Feather name={"message-circle"} size={20} color={'grey'}/>
                <Text style={styles.number}>{tweet.numberOfComments}</Text>
            </View>
            <View style={styles.iconContainer}>
                
                <TouchableOpacity onPress={onReport}>
                    <AntDesign name={"exclamationcircleo"} size={20} color={!myReport?'grey':'red'}/>
                </TouchableOpacity>
            </View>

    </View>
    )
}
    


export default Footer;