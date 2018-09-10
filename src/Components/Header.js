import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'

class header extends Component {
    render(){
        return (
            <View style={styles.header}>
                <Text style={styles.text}>Sistema Operacional</Text>
                <Text style={{color: '#fff'}}>Escalonadores</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    header: {
        marginTop: 70,
        alignItems: 'center'
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default header;