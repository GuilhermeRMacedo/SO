import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const core = (props) => (
    <View style={styles.core}>
        <View style={styles.tempoADecrementar}>
            <Text style={{color: '#fff'}}>{props.totalTime}</Text>
        </View>
        <View style={styles.idprocesso}>
            <Text style={{color: '#fff'}}>{props.processId}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    core: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#fff',
        marginBottom: 2
    },
    tempoADecrementar: {
        marginLeft: 50
    },
    idprocesso: {
        alignItems: 'center',
        marginTop: 5
    }
})

export default core;