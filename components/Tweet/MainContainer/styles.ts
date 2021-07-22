import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        marginHorizontal:10,
        flex: 1,
    },
    tweetHeaderContainer: {
        
        flexDirection: "row",
        justifyContent: 'space-between', 
    }, 
    tweetHeaderNames: {
        flex: 1,
        flexDirection: "row", 
    },
    name: {
        marginRight: 3,
        fontWeight: "bold",
    },
    
    username: {
        marginRight: 3,
        color: 'grey',

    }, 
    createdAt: {
        marginRight: 3,
        color: 'grey'
    },
    content: {
        marginVertical: 5,
        lineHeight: 18,
    },
    image: {
        marginVertical: 5,
        width: "100%",
        height: 200,
        resizeMode: 'contain',
        borderRadius: 15,
        overflow: "hidden",
    }
    

})

export default styles;