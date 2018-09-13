import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

const cores = (props) => (
    <View style={styles.core}>
        <View style={styles.tempoADecrementar}>
            <Text>{props.totalTime}</Text>
        </View>
        <View style={styles.idprocesso}>
            <Text>{props.processId}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    core: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#000',
        marginBottom: 2
    },
    tempoADecrementar: {
        alignItems: 'center',
        marginTop: 5
    },
    idprocesso: {
        alignItems: 'center',
        marginTop: 5
    }
})

export default core;