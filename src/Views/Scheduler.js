import React from 'react';
import { StyleSheet, Text, ScrollView, View, Button, Alert } from 'react-native';

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
                deadLine: 0,
            })
        }
        this.setState({
            listProcesses: this.insertionSort(listProcesses)
        })
    }

    insertionSort = (arr) => {  //https://stackoverflow.com/questions/14320101/insert-sort-array-of-objects
        for (i = 1; i < arr.length; i++) {
            var tmp = arr[i],
                j = i;
            while (j > 0 && arr[j - 1].totalTime > tmp.totalTime) {
                arr[j] = arr[j - 1];
                --j;
            }
            arr[j] = tmp;
        }
        return arr;
    }

    getRandomIntProcessTotalTime() {
        min = Math.ceil(1);
        max = Math.floor(21);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    newProcessToListProcesses = () => {
        let list = this.state.listProcesses;
        list.push({
            key: Math.random(),
            totalTime: this.getRandomIntProcessTotalTime(),
            processId: "NP" + (Math.random() * 1000).toFixed(0),
            deadLine: 0
        })
        let lastProcessInsertedId = list[list.length-1].processId;
        this.setState({
            listProcesses: this.insertionSort(list),
            processos: list.length,
            lastProcessInsertedId
        })
    }

    render() {
        return (
            <ScrollView style={styles.mom}>
                {/* <Text style={{ paddingTop: 20 }}>Cores: {state.cores}, Processos: {state.processos}, Quantum: {state.quantum}, QuantumHasValue: {state.quantumHasValue ? "true" : "false"}</Text> */}
                <Text style={{ paddingTop: 20 }}>Cores: {this.state.cores}, Processos: {this.state.processos}, Quantum: {this.state.quantum}, QuantumHasValue: {this.state.quantumHasValue ? "true" : "false"}</Text>
                
                <View style={styles.newProcessButtonView}>
                    <Button title="Novo processo aleatório" color='#660066' onPress={this.newProcessToListProcesses} />
                    <Text>Ultimo Processo: {this.state.lastProcessInsertedId}</Text>
                </View>

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
    },
    newProcessButtonView: {
        marginTop: 10,
        height: 30,
        alignItems: 'center',
        flexDirection: 'column'
    }
});
