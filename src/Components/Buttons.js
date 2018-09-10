import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

class buttons extends Component {
    render() {
        return (
            <View style={styles.mom}>
                <View style={styles.buttons}>
                    <Button title="Shortest Job First" color= '#660066'/>
                </View>
                <View style={styles.buttons}>
                    <Button title="Round Robin" color= '#660066' />
                </View>
                <View style={styles.buttons}>
                    <Button title="Least Time to Go" color= '#660066' />
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


})

export default buttons;