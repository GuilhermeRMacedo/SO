import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

const process = (props) => (
    <View style={styles.processo}>
        <View style={styles.tempoTotal}>
            <Text style={{color: '#fff'}}>{props.totalTime}</Text>
        </View>
        <View style={styles.idprocesso}>
            <Text style={{color: '#fff'}}>{props.processId}</Text>
        </View>
        <Text style={styles.deadLine}>{props.deadLine}</Text>
    </View>
)

const styles = StyleSheet.create({
    processo: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#fff',
        marginBottom: 2
    },
    idprocesso: {
        alignItems: 'center',
        marginTop: 5
    },
    tempoTotal: {
        marginLeft: 55
    },
    deadLine: {
        marginLeft: 30,
        marginTop: 6,
        color: '#fff'
    }
})

export default process;