import React from 'react';
import { StyleSheet, Text, ScrollView, View, Button, Alert } from 'react-native';

import Header from '../Components/Header'
import Inputs from '../Components/Inputs'
import Buttons from '../Components/Buttons'
import { Processes } from '../Components/Processes'
import { Cores } from '../Components/Cores'
import { Memory } from '../Components/Memory';

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
        const totalTime = this.getRandomIntProcessTotalTime();
        list.push({
            key: Math.random(),
            totalTime: totalTime,
            fulltime: totalTime,
            processId: "NP" + (Math.random() * 1000).toFixed(0),
            deadLine: 0
        })
        let lastProcessInsertedId = list[list.length - 1].processId;
        this.setState({
            listProcesses: list,
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
            fulltime = listCores[0].fulltime;
            console.log("teste - " + fulltime);
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
                if (listCores[i].isWorking === true) {
                    timeProcessed++;
                }

                if (listCores[i].isWorking === false) {
                    timeProcessed = 0;
                }

                console.log(listCores[i].processId);
                fulltime = listCores[i].fulltime;
                console.log("fulltime: " + fulltime);
                fulltime = fulltime - quantum;
                console.log("quantum: " + quantum);
                console.log("fulltime-quantum: " + fulltime);

                if (isNaN(fulltime)) {
                    fulltime = 0;
                }

                if (timeProcessed >= quantum) {
                    timeProcessed = 0;
                    listProcesses.push({
                        key: Math.random(),
                        totalTime: fulltime,
                        fulltime: fulltime,
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

                console.log("tempo atual do core: " + listCores[i].totalTime);

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
                {/* <Text style={{ paddingTop: 20 }}>Cores: {this.state.cores}, Processos: {this.state.processos}, Memoria: {this.state.memoria}, Quantum: {this.state.quantum}, QuantumHasValue: {this.state.quantumHasValue ? "true" : "false"}</Text> */}

                <View style={styles.newProcessButtonView}>
                    <View style={styles.buttons}>
                        <Button title="Iniciar" color='#800080' onPress={this.scheduler} />
                    </View>
                    <View style={styles.buttons}>
                        <Button title="Novo processo aleatório" color='#800080' onPress={this.newProcessToListProcesses} />
                    </View>
                    <Text style={{color: '#fff'}} >Ultimo Processo: {this.state.lastProcessInsertedId}</Text>
                </View>

                <View style={styles.memory}>
                    <Memory />
                </View>

                <View style={{ flexDirection: 'row'}}>
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
        backgroundColor: '#660066'
    },
    newProcessButtonView: {
        paddingTop: 20,
        marginTop: 10,
        height: 30,
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 20,
        paddingTop: 20
    },
    buttons: {
        marginBottom: 5
    },
    memory:{
        marginTop: 80,
        
    }
});
