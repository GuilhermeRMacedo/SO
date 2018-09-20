import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Core from './Core'

export class Cores extends React.Component {
    render() {
        return (
            <View style={styles.cores}>
                <Text style={{ fontSize: 12, color: '#fff' }}>Cores</Text>
                <Text style={{ fontSize: 10, color: '#fff' }}>Quantum: {this.props.quantum}s</Text>

                {this.props.listCores.map(i => {
                    return <Core
                        key = {Math.random()}
                        totalTime={i.totalTime}
                        processId={i.processId}
                    />
                })}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    cores: {
        borderColor: '#fff',
        borderRadius: 2,
        borderWidth: 1,
        width: 78,
        marginLeft: 30,
        marginTop: 40,
        alignItems: 'center'
    }
})

// export default cores;