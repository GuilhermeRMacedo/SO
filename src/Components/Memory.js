import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export class Memory extends React.Component {
    render(){
        return(
            <View style={styles.memory}>
                <Text style={{color: '#fff'}}>Memoria: {this.props.memoryFullSize}Kb</Text>
                <View style={styles.content}>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   memory:{
       marginLeft: 30,
       marginRight: 30
   },
   content:{
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    height: 40
   }
})