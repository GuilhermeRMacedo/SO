import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const block = (props) => (
    <View style={[styles.block, {width: props.totalSizeToScreen}]}>
        <Text style={{color: '#fff', textAlign: 'center'}}>b{props.id}</Text>
        <Text style={{color: '#fff', textAlign: 'center'}}>{''+props.isWorking}</Text>
        <Text style={{color: '#fff', textAlign: 'center'}}>{props.processId}</Text>
        <Text style={{color: '#fff', textAlign: 'center'}}>{props.usedSize}/{props.totalSize}</Text>
    </View>
)

const styles = StyleSheet.create({
    block: {
        height: 146,
        //width: 40,    //para tamanho fixo
        marginTop: 1,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#fff',
    },

})

export default block;