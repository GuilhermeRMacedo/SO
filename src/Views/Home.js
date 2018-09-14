import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../Components/Header'
import Inputs from '../Components/Inputs'
import Buttons from '../Components/Buttons'
import Processes from '../Components/Processes'
import Cores from '../Components/Cores'

export default class Home extends React.Component {
    state = {
        cores: '',
        processos: '',
        quantum: '',
        quantumHasValue: false
    }

    placeCoresChangedHandler = (input) => {
        this.setState({
            cores: input
        })
    }

    placeProcessosChangedHandler = (input) => {
        this.setState({
            processos: input
        })
    }

    placeQuantumChangedHandler = (input) => {
        if (input.length !== 0) {
            this.setState({
                quantum: input,
                quantumHasValue: true
            })
        } else {
            this.setState({
                quantum: input,
                quantumHasValue: false
            })
        }
    }

    render() {
        return (
            <View style={styles.mom}>

                <Text style={{ paddingTop: 20 }}>Cores: {this.state.cores}, Processos: {this.state.processos}, Quantum: {this.state.quantum}, QuantumHasValue: {this.state.quantumHasValue ? "true" : "false"}</Text>
                <Header />
                <Inputs
                    placeCoresChangedHandler={this.placeCoresChangedHandler}
                    placeProcessosChangedHandler={this.placeProcessosChangedHandler}
                />
                <Buttons
                    placeQuantumChangedHandler={this.placeQuantumChangedHandler}
                    quantumHasValue={this.state.quantumHasValue}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mom: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#800080'
    }
});