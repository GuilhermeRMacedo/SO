import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Process from './Process'

const processes = (props) => (
    <View style={styles.processos}>
        <Text style={{ fontSize: 12, color: '#fff' }}>Fila de aptos</Text>
        <Process
            totalTime={8}
            processId='p1'
            deadLine={2}
        />
        <Process
            totalTime={2}
            processId='p2'
            deadLine={3}
        />
        <Process
            totalTime={2}
            processId='p2'
            deadLine={3}
        />
        <Process
            totalTime={2}
            processId='p2'
            deadLine={3}
        />
        <Process
            totalTime={2}
            processId='p7'
            deadLine={3}
        />
        
    </View>
)

const styles = StyleSheet.create({
    processos: {
        borderColor: '#fff',
        borderRadius: 2,
        borderWidth: 1,
        width: 78,
        marginLeft: 30,
        marginTop: 40,
        alignItems: 'center'
    }
})

export default processes;