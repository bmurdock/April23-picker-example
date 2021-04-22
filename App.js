import { StatusBar } from 'expo-status-bar';
// We need to import useState seperately if we want to refer to it with shorthand
import React, {useState, Component as RC} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {store, retrieve} from './util';


export default function App() {

  // the useState function is going to return an array
  // of arguments. The first argument is the holder of the value
  // the second argument is a function that can change that value.
  // [holder, changer]
  // so when we declare it, we will destructure the array and
  // set our own names for those arguments
  const [clicks, setClicks] = useState(8);

  return (
    <View style={styles.container}>
      <Text selectable={false}>You have clicked {clicks} times.</Text>
      <StatusBar style="auto" />
      <Button onPress={() => setClicks(clicks - 1)} 
        title='Click Me'
      />
      <NewButton 
        label="Handle It"
        onPress={() => console.log('pressed')}
      />

    </View>
  );
}

class NewButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 8,
    }
  }

  pressHandler = () =>
  {
    // execute my specific button handler code first
    console.log('press handler');

    // set our clicks
    const myStateObject = {
      clicks: this.state.clicks + 1,
    };
    const afterStateHandler = () =>
    {
      console.log(`Button has been pressed ${this.state.clicks} times.`);
      store('clicks', this.state.clicks)
      .then((result) =>
      {
        console.log("I stored something. It should have been: ", this.state.clicks);
        console.log('Result was: ', result);
      });

    }
    this.setState(myStateObject, afterStateHandler);

    retrieve('clicks')
    .then((val) =>
    {
      console.log('Local storage had val as: ', val);
    })
    .catch((err) =>
    {
      console.log('Just not having a good day: ', err);
    })

    // execute the code the USER would like to execute
    this.props.onPress();
  }

  render() {
    return (
      <View style={buttonStyles.base} onClick={this.pressHandler}>
        <Text selectable={false} style={buttonStyles.text}>{this.props.label}</Text>
      </View>
    )
  }
}

const buttonStyles = StyleSheet.create({
  base: {
    width: 300,
    height: 200,
    backgroundColor: 'red',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '900',
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 400,
    height: 300,
  }
});
