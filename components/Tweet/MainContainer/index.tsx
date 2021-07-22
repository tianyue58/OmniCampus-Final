import React from 'react';
import { View, Text, Image } from 'react-native';
import {S3Image} from 'aws-amplify-react-native';
import { TweetType } from '../../../types';
import styles from '../MainContainer/styles';
import { Ionicons } from '@expo/vector-icons';
import Footer from './Footer';
import moment from 'moment';

export type MainContainerProps = {
    tweet: TweetType,
}

const MainContainer = ({tweet}: MainContainerProps) => (
    <View style={styles.container}>
        <View style={styles.tweetHeaderContainer}>
            <View style={styles.tweetHeaderNames}>
                <Text style={styles.name}>{tweet.user.name}</Text>
                <Text style={styles.username}>@{tweet.user.username}</Text>
                <Text style={styles.createdAt}>{moment(tweet.createdAt).fromNow()}</Text>
            </View>
            
        </View>
        <View>
            <Text style={styles.content}>{tweet.content}</Text>
            {!!tweet.image && <S3Image style={styles.image} imgKey={tweet.image} />}
        </View>
        <Footer tweet={tweet}/>

        

    </View>
)

export default MainContainer;