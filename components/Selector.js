import React from 'react';
import { Text, View, TextInput } from 'react-native';

import styles from './styles'


export default class Selectors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mins: props.time.minutes,
      secs: props.time.secondes
    }
  }

  handleMinChange = (e) => {
    const mins = e
    this.setState({mins}, () => {
      this.props.callback(this.state.mins, this.state.secs)
    })  
  }

  handleSecChange = (e) => {
    const secs = e
    this.setState({secs}, () => {
      this.props.callback(this.state.mins, this.state.secs)
    })
  }

  render() {
    return (
      <View style={styles.selectors}>
        <Text>Select {this.props.status} time</Text>
        <TextInput 
          style={styles.numInput}
          keyboardType = 'number-pad'
          defaultValue = {`${this.props.time.minutes}`}
          onChangeText = {this.handleMinChange}
        />
        <Text> : </Text>
        <TextInput 
          style={styles.numInput}
          keyboardType = 'number-pad'
          value = {`${this.props.time.secondes}`}
          onChangeText = {this.handleSecChange}
        />
      </View>
    )
  }
}