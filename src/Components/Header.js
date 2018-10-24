import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const header = () => (
    <View style={styles.header}>
        <Text style={styles.text}>Sistema Operacional</Text>
        <Text style={{ color: '#fff' }}>Escalonadores e Memória</Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        marginTop: 70,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default header;