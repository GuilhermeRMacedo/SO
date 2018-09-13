import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Core from './Core'

const cores = (props) => (
    <View style={styles.cores}>
        <Text style={{ fontSize: 12, color: '#fff' }}>Cores</Text>
        <Core
            totalTime={0}
            processId="p4"
        />
        <Core
            totalTime={0}
            processId="p4"
        />
        
    </View>
)

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

export default cores;