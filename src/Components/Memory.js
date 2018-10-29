import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Block from './Block';

export class Memory extends React.Component {
    render() {
        return (
            <View style={styles.memory}>
                <Text style={{ color: '#fff' }}>Memoria: {this.props.memoryFullSize}Kb</Text>
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

                    {/* <Block
                        id = {'0'}
                        totalSize={(20/this.props.memoryFullSize)*298}
                    />
                    <Block
                        id = {'1'}
                        totalSize={(30/this.props.memoryFullSize)*298}
                    /> */}


                </View>
                <Text style={{ color: '#fff', marginLeft: 210}}>Livre: {this.props.memoriaFreeSpace}Kb</Text>
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
        height: 80,
        flexDirection: 'row'
    }
})