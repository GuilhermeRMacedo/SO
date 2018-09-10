import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

const buttons = (props) => (
    <View style={styles.mom}>
        <View style={styles.buttons}>
            <Button title="Shortest Job First" color='#660066' disabled={props.quantumHasValue}/>
        </View>
        <View style={styles.roundRobin}>
            <Button title="Round Robin" color='#660066' />
            <TextInput
                placeholder="Quantum"
                keyboardType='numeric'
                style={styles.placeInput} 
                onChangeText={props.placeQuantumChangedHandler}/>
        </View>
        <View style={styles.buttons}>
            <Button title="Least Time to Go" color='#660066' disabled={props.quantumHasValue}/>
        </View>
    </View>
)


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

export default buttons;