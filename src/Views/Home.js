import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation'

import Header from '../Components/Header'
import Inputs from '../Components/Inputs'
import { Buttons } from '../Components/Buttons'
import Processes from '../Components/Processes'
import Cores from '../Components/Cores'

import Block from '../Components/Block'

export class Home extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        cores: '',
        processos: '',
        memoria: '',
        quantum: '',
        quantumHasValue: false,
        abortedProcesses: [],
        memoryBlockList: [],
        memoriaFreeSpace: ''
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

    placeMemoriaChangedHandler = (input) => {
        this.setState({
            memoria: input,
            memoriaFreeSpace: input
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

                {/* <Text style={{ paddingTop: 20 }}>Cores: {this.state.cores}, Processos: {this.state.processos}, Quantum: {this.state.quantum}, QuantumHasValue: {this.state.quantumHasValue ? "true" : "false"}</Text> */}
                <Header />
                <Inputs
                    placeCoresChangedHandler={this.placeCoresChangedHandler}
                    placeProcessosChangedHandler={this.placeProcessosChangedHandler}
                    placeMemoriaChangedHandler={this.placeMemoriaChangedHandler}
                />
                <Buttons
                    navigate={navigate}
                    placeQuantumChangedHandler={this.placeQuantumChangedHandler}
                    quantumHasValue={this.quantumHasValue}
                    state={this.state}

                    onPress={this.onPress}
                />

                {/* <Block
                    key={Math.random()}
                    id={'0'}
                    totalSizeToScreen={60}
                    processId={'p0'}
                    isWorking={''+false}
                    totalSize={60}
                    usedSize={20}
                /> */}

            </View>
        )
    }

}

const styles = StyleSheet.create({
    mom: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#660066'
    }
});

// export default home;
