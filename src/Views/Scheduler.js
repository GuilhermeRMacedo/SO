import React from 'react';
import { StyleSheet, Text, ScrollView, View, FlatList } from 'react-native';

import Header from '../Components/Header'
import Inputs from '../Components/Inputs'
import Buttons from '../Components/Buttons'
import { Processes } from '../Components/Processes'
import Cores from '../Components/Cores'

export class Scheduler extends React.Component {
    static navigationOptions = {
        header: null
    };

    loadState = () => {
        const { navigation } = this.props;
        const state = navigation.getParam('state', 'NO-ID');
        return state;
    }

    state = this.loadState();

    componentWillMount() {
        this.generateListProcessesSJF(this.state.processos);
    }

    generateListProcessesSJF = (nProcesses) => {
        let listProcesses = []
        for (let i = 0; i < nProcesses; i++) {
            listProcesses.push({
                key: { i },
                totalTime: this.getRandomIntProcessTotalTime(),
                processId: "p" + i,
                deadLine: 0
            })
        }
        this.setState({
            listProcesses: listProcesses
        })
    }

    insertionSort = (array) => {
        
    }

    getRandomIntProcessTotalTime() {
        min = Math.ceil(1);
        max = Math.floor(21);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    render() {
        return (
            <ScrollView style={styles.mom}>
                {/* <Text style={{ paddingTop: 20 }}>Cores: {state.cores}, Processos: {state.processos}, Quantum: {state.quantum}, QuantumHasValue: {state.quantumHasValue ? "true" : "false"}</Text> */}
                <Text style={{ paddingTop: 20 }}>Cores: {this.state.cores}, Processos: {this.state.processos}, Quantum: {this.state.quantum}, QuantumHasValue: {this.state.quantumHasValue ? "true" : "false"}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Processes listProcesses={this.state.listProcesses} />
                    </View>
                    <View style={{ marginLeft: 110 }}>
                        <Cores />
                    </View>
                </View>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    mom: {
        backgroundColor: '#800080'
    }
});
