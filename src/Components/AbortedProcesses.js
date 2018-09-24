import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Process from './Process'

export class AbortedProcesses extends React.Component {
    render() {
        return (
            <View style={styles.processos}>
                <Text style={{ fontSize: 12, color: '#fff' }}>Abortados</Text>

                {this.props.abortedProcesses.map(i => {
                    return <Process
                    key = {Math.random()}
                    totalTime={i.totalTime}
                    processId={i.processId}
                    deadLine={i.deadLine}
                />
                })}
                

            </View>
        )
    }
}

const styles = StyleSheet.create({
    processos: {
        borderColor: '#fff',
        borderRadius: 2,
        borderWidth: 1,
        width: 78,
        marginLeft: 30,
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 20
    }
})
