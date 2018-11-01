import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Block from './Block';

export class Memory extends React.Component {
    render() {
        return (
            <View style={styles.memory}>
                <Text style={{ color: '#fff' }}>Memoria: {this.props.memoryFullSize}Mb</Text>
                <View style={styles.content}>

                    {/* {console.log(this.props.memoryBlockList + " -bug aqui")}  */}
                    {this.props.memoryBlockList.map(i => {
                        return <Block
                            key={Math.random()}
                            id={i.id}
                            totalSizeToScreen={(i.totalSize / this.props.memoryFullSize) * 298}
                            processId = {i.processId}
                            isWorking = {i.isWorking}
                            totalSize = {i.totalSize}
                            unusedSize = {i.unusedSize}
                            usedSize = {i.usedSize}
                        />
                    })}

                </View>
                <Text style={{ color: '#fff', marginLeft: 210}}>Livre: {this.props.memoriaFreeSpace}Mb</Text>
                <Text style={{ color: '#fff', marginLeft: 110}}>Fragmentação interna: {this.props.internalFragmentation}Mb</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    memory: {
        marginLeft: 30,
        marginRight: 30
    },
    content: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 2,
        height: 150,
        flexDirection: 'row'
    }
})