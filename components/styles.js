import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';


export default StyleSheet.create({
  head:{
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 60,
    marginBottom: 40,
    textAlign: 'center'
  },
  message: {
    textAlign: 'center',
    fontSize: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  numInput: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
    height: 30,
    width: 80,
  },
  button: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
    width: 230,
  },
  selectors: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
})