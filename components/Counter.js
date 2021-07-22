import React from 'react';
import { Text, View, Button, Vibration  } from 'react-native';

import styles from './styles'

const minToSec = mins => mins * 60 

export default class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.intervalHandle
    this.state = {  
      ...this.props.timingWork,
      secondsRemaining: minToSec(this.props.timingWork.minutes) - 1,
      chill: {...this.props.timingChill},
      work: {...this.props.timingWork}
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps !== this.props){
      this.setState({
        ...nextProps.timingWork,
        secondsRemaining: minToSec(nextProps.timingWork.minutes) - 1,
        chill: {...nextProps.timingChill},
        work: {...nextProps.timingWork}
      })
    }
  }

  tick = () => {
    if (this.state.secondsRemaining < 0) {
      this.setState({secondsRemaining: this.state.secondes})
    }
    let minutes = Math.floor(this.state.secondsRemaining / 60);
    let secondes = this.state.secondsRemaining - (minutes * 60);

    this.setState({minutes, secondes})

    if (minutes === 0 & secondes === 0) {
      Vibration.vibrate([500, 500, 500])
      clearInterval(this.intervalHandle)
      this.toggleCounter()
      this.intervalHandle = setInterval(this.tick, 1000)
    }

    this.setState(prevState => ({secondsRemaining: prevState.secondsRemaining - 1}))
  }

  toggleCounter = () => {
    if (this.state.message === "Focus ⏳") {
      this.setState({
        ...this.state.chill,
        secondsRemaining: minToSec(this.state.chill.minutes),
      })
    } else {
      this.setState({
        ...this.state.work,
        secondsRemaining: minToSec(this.state.work.minutes),
      }) 
    }
  }

  startTimer = () => {this.intervalHandle = setInterval(this.tick, 1000)}

  pauseTimer = () => {clearInterval(this.intervalHandle)}

  resetTimer = () => {
    clearInterval(this.intervalHandle)
    this.setState({
      ...this.props.timingWork,
      secondsRemaining: minToSec(this.props.timingWork.minutes),
    })
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle)
  }
 
  render() {
    const paddedMin = this.state.minutes < 10 ? '0' : ""
    const paddedSec = this.state.secondes < 10 ? '0' : ""
    return (
      <View>
        <Text style={styles.message}>{this.state.message}</Text>
        <Text style={styles.count}>{paddedMin}{this.state.minutes} : {paddedSec}{this.state.secondes}</Text>
        <View style={styles.button}>
          <Button color="white" onPress={this.startTimer} title="START"></Button>
        </View>
        <View style={styles.button}>
          <Button color="white" onPress={this.pauseTimer} title="PAUSE"></Button>
        </View>
        <View style={styles.button}>
          <Button color="white" onPress={this.resetTimer} title="RESET"></Button>
        </View>
      </View>
    )
  }
}