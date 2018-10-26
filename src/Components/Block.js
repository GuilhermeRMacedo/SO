import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const block = (props) => (
    <View style={[styles.block, {width: props.totalSize}]}>
        <Text style={{color: '#fff', textAlign: 'center'}}>{props.id}</Text>
    </View>
)

const styles = StyleSheet.create({
    block: {
        height: 46,
        //width: 40,    //para tamanho fixo
        marginTop: 1,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#fff',
    },

})

export default block;