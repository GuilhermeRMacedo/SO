import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

const inputs = (props) => (
    <View style={styles.mom}>
        <TextInput
            placeholder='Cores'
            style={styles.placeInput}
            keyboardType='numeric'
            underlineColorAndroid="#800080"
            onChangeText={props.placeCoresChangedHandler}
        />
        <TextInput
            placeholder='Processos'
            style={styles.placeInput}
            keyboardType='numeric'
            underlineColorAndroid="#800080" 
            onChangeText = {props.placeProcessosChangedHandler}
            />
    </View>

)

const styles = StyleSheet.create({
    mom: {
        alignItems: 'center',
        marginTop: 50
    },
    placeInput: {
        width: "30%",
        marginTop: 10,
        textAlign: 'center',
        borderWidth: 1,
        color: '#fff',
        borderColor: '#fff',
        borderRadius: 2
    }
})

export default inputs