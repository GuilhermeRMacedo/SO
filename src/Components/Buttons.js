import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native'

export class Buttons extends React.Component {
    render() {
        return (
            <View style={styles.mom}>
                <View style={styles.buttons}>
                    <Button title="Shortest Job First" color='#800080' disabled={this.props.quantumHasValue} onPress={()=>this.props.navigate('SchedulerRT', {state: this.props.state})} />
                </View>
                <View style={styles.roundRobin}>
                    <Button title="Round Robin" color='#800080' onPress={()=>this.props.navigate('RoundRobinRT', {state: this.props.state})}/>
                    <TextInput
                        placeholder="Quantum"
                        keyboardType='numeric'
                        style={styles.placeInput}
                        onChangeText={this.props.placeQuantumChangedHandler} 
                        underlineColorAndroid="#660066" />
                </View>
                <View style={styles.buttons}>
                    <Button title="Least Time to Go" color='#800080' disabled={this.props.quantumHasValue} onPress={()=>this.props.navigate('LeastTimetoGoRT', {state: this.props.state})} />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mom: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50
    },
    buttons: {
        marginTop: 15
    },
    roundRobin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    placeInput: {
        width: "30%",
        marginLeft: 10,
        textAlign: 'center',
        borderWidth: 1,
        color: '#fff',
        borderColor: '#fff',
        borderRadius: 2
    }

})
