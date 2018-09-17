import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation'

import Header from '../Components/Header'
import Inputs from '../Components/Inputs'
import {Buttons} from '../Components/Buttons'
import Processes from '../Components/Processes'
import Cores from '../Components/Cores'

export class Home extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        cores: '',
        processos: '',
        quantum: '',
        quantumHasValue: false,
        screenHomeIsOpen: false
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

    onPress = () => {
        Alert.alert('apertou botao')
    }


    render() {
        const { navigate } = this.props.navigation;
        const state = this.state;
        return (
            <View style={styles.mom}>

                <Text style={{ paddingTop: 20 }}>Cores: {this.state.cores}, Processos: {this.state.processos}, Quantum: {this.state.quantum}, QuantumHasValue: {this.state.quantumHasValue ? "true" : "false"}</Text>
                <Header />
                <Inputs
                    placeCoresChangedHandler={this.placeCoresChangedHandler}
                    placeProcessosChangedHandler={this.placeProcessosChangedHandler}
                />
                <Buttons
                    navigate = {navigate}
                    placeQuantumChangedHandler={this.placeQuantumChangedHandler}
                    quantumHasValue={this.quantumHasValue}
                    state={this.state}

                    onPress={this.onPress}
                />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    mom: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#800080'
    }
});

// export default home;
