import React from 'react';
import { StyleSheet, Text, ScrollView, View, Button, Alert } from 'react-native';

import Header from '../Components/Header'
import Inputs from '../Components/Inputs'
import Buttons from '../Components/Buttons'
import { Processes } from '../Components/Processes'
import { Cores } from '../Components/Cores'

export class RoundRobin extends React.Component {
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
        this.generateListCores(this.state.cores);
    }

    generateListProcessesSJF = (nProcesses) => {
        let listProcesses = []
        for (let i = 0; i < nProcesses; i++) {
            const totalTime = this.getRandomIntProcessTotalTime();
            listProcesses.push({
                key: { i },
                totalTime: totalTime,
                fulltime: totalTime,
                processId: "p" + i,
                deadLine: 0
            })
        }
        this.setState({
            listProcesses: listProcesses
        })
    }


    getRandomIntProcessTotalTime() {
        min = Math.ceil(4);
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
        let lastProcessInsertedId = list[list.length - 1].processId;
        this.setState({
            listProcesses: this.insertionSort(list),
            processos: list.length,
            lastProcessInsertedId
        })
    }

    generateListCores = (nCores) => {
        listCores = [];
        for (let i = 0; i < nCores; i++) {
            listCores.push({
                key: { i },
                totalTime: 0,
                processId: "",
                isWorking: false,
                timeProcessed: 0,
                fulltime: 0,
            })
        }
        this.setState({
            listCores: listCores,
            cores: listCores.length
        })
    }

    scheduler = () => {
        setInterval(() => {
            console.log("se passou 1 segundo");

            quantum = this.state.quantum;
            listProcesses = [];
            for (let i = 0; i < this.state.listProcesses.length; i++) {
                listProcesses[i] = this.state.listProcesses[i];
            }

            listCores = [];
            for (let i = 0; i < this.state.listCores.length; i++) {
                listCores[i] = this.state.listCores[i];

            }

            for (let i = 0; i < listCores.length; i++) {
                if (listCores[i].isWorking === false) {
                    if (listProcesses[0] !== undefined) {
                        listCores[i] = listProcesses.shift();
                        listCores[i].isWorking = true;
                    }
                }
            }

            for (let i = 0; i < listCores.length; i++) {
                listCores[i].totalTime--;

                if (listCores[i].totalTime === 0) {
                    listCores[i] = {
                        totalTime: 0,
                        processId: "",
                        isWorking: false
                    }
                }
                if (listCores[i].isWorking === false) {
                    listCores[i] = {
                        totalTime: 0,
                        processId: "",
                        isWorking: false
                    }
                }
            }

            for (let i = 0; i < listCores.length; i++) {
                timeProcessed = this.state.listCores[i].timeProcessed;
                //console.log(timeProcessed);
                if (listCores[i].isWorking === true) {
                    timeProcessed++;
                }

                if (listCores[i].isWorking === false) {
                    timeProcessed = 0;
                }

                fulltime = listCores[i].fulltime;
                fulltime = fulltime - quantum;
                //console.log(listCores[i].fulltime - quantum);
                console.log(fulltime);
                console.log(quantum);

                // 7 - 5 está dando NaN, 2 - 5 não WTF.

                if(isNaN(fulltime)){ 
                    fulltime = 0;
                }

                if (timeProcessed == quantum) {
                    timeProcessed = 0;
                    listProcesses.push({
                        key: Math.random(),
                        totalTime: fulltime,
                        processId: listCores[i].processId,
                        deadLine: 0
                    });
                    listCores[i] = {
                        key: { i },
                        totalTime: 0,
                        processId: "",
                        isWorking: false,
                        timeProcessed: 0,
                        fulltime: 0
                    }
                }

                listCores[i].timeProcessed = timeProcessed;
            }

            this.setState({
                listProcesses: listProcesses,
                listCores: listCores
            })
        }, 1000)
    }



    render() {
        return (
            <ScrollView style={styles.mom}>
                {/* <Text style={{ paddingTop: 20 }}>Cores: {state.cores}, Processos: {state.processos}, Quantum: {state.quantum}, QuantumHasValue: {state.quantumHasValue ? "true" : "false"}</Text> */}
                <Text style={{ paddingTop: 20 }}>Cores: {this.state.cores}, Processos: {this.state.processos}, Quantum: {this.state.quantum}, QuantumHasValue: {this.state.quantumHasValue ? "true" : "false"}</Text>
                <Text>round robin</Text>
                <View style={styles.newProcessButtonView}>
                    <Button title="Iniciar" color='#660066' onPress={this.scheduler} />
                    <Button title="Novo processo aleatório" color='#660066' onPress={this.newProcessToListProcesses} />
                    <Text>Ultimo Processo: {this.state.lastProcessInsertedId}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Processes listProcesses={this.state.listProcesses} />
                    </View>
                    <View style={{ marginLeft: 110 }}>
                        <Cores listCores={this.state.listCores} quantum={this.state.quantum} />
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
        flexDirection: 'column',
        marginBottom: 20
    }
});
