import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Process from './Process'

export class Processes extends React.Component {
    render() {
        return (
            <View style={styles.processos}>
                <Text style={{ fontSize: 12, color: '#fff' }}>Fila de aptos</Text>

                {this.props.listProcesses.map(i => {
                    return <Process
                    key = {Math.random()}
                    totalTime={i.totalTime}
                    processId={i.processId}
                    deadLine={i.deadLine}
                    bytesCost={i.bytesCost}
                    bytesCostIsNumber={typeof i.bytesCost === Number ? true : false}
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
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 20
    }
})
