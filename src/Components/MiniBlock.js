import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const miniBlock = (props) => (
    <View style={styles.miniBlock}>
        <Text style={{color: '#fff', textAlign: 'center'}}>{props.id}</Text>
        <Text style={{color: '#fff', textAlign: 'center'}}>{props.isWorking}</Text>
        <Text style={{color: '#fff', textAlign: 'center'}}>{props.processId}</Text>
    </View>
);

const styles = StyleSheet.create({
    miniBlock: {
        width: 28,
        height: 63,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#fff",
        marginBottom: 2,
        marginLeft: 2
    }
})

export default miniBlock;