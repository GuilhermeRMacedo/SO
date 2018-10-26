import React from 'react';
import { StyleSheet, Text, ScrollView, View, Button, Alert } from 'react-native';

import Header from '../Components/Header'
import Inputs from '../Components/Inputs'
import Buttons from '../Components/Buttons'
import { Processes } from '../Components/Processes'
import { Cores } from '../Components/Cores'
import { Memory } from '../Components/Memory'

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
        this.generateListProcesses(this.state.processos);
        this.generateListCores(this.state.cores);
    }

    generateListProcesses = (nProcesses) => {
        let listProcesses = []
        for (let i = 0; i < nProcesses; i++) {
            const totalTime = this.getRandomIntProcessTotalTime();
            const bytesCost = this.getRandomIntProcessMemoryCostBytes();
            listProcesses.push({
                key: { i },
                totalTime: totalTime,
                fulltime: totalTime,
                processId: "p" + i,
                deadLine: 0,
                bytesCost: bytesCost
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

    getRandomIntProcessMemoryCostBytes() {
        min = Math.ceil(32);
        max = Math.floor(1025);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    newProcessToListProcesses = () => {
        let list = this.state.listProcesses;
        const totalTime = this.getRandomIntProcessTotalTime();
        const bytesCost = this.getRandomIntProcessMemoryCostBytes();
        list.push({
            key: Math.random(),
            totalTime: totalTime,
            fulltime: totalTime,
            processId: "NP" + (Math.random() * 1000).toFixed(0),
            deadLine: 0,
            bytesCost: bytesCost
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

    newMemoryBlock(process){

        let memoryBlock = {
            isWorking: false,
            id: '0',
            processId: process.processId,
            totalSize: process.bytesCost,
            unusedSize: this.totalSize - process.bytesCost
        }

        return memoryBlock;
    }

    bestFit(memoryBlock){
        let BlockList = this.state.memoryBlockList;   
        let memoryFreeSpace = this.state.memoria;

        if(memoryFreeSpace >= memoryBlock.totalSize){
            //memoryBlock.isWorking = true;
            memoryFreeSpace = memoryFreeSpace - memoryBlock.totalSize;
            BlockList.push({
                isWorking: true,
                id: '0',
                processId: memoryBlock.processId,
                totalSize: memoryBlock.totalSize,
                unusedSize: memoryBlock.unusedSize
            });
        }else{
            let bestIndex = -1;
            let bestSpace = Math.max();
            for(let i = 0; i < BlockList.length; i++){
                if(BlockList[i].isWorking === false){
                    //save index
                    let space = BlockList[i].totalSize - memoryBlock.totalSize;
                    if(space < bestSpace){
                        bestIndex = i;
                    }  
                }
            }

            if(bestIndex !== -1){
                BlockList[bestIndex].isWorking = true;
                BlockList[bestIndex].id = '0';
                BlockList[bestIndex].processId = memoryBlock.processId;
                BlockList[bestIndex].unusedSize = memoryBlockList[bestIndex].totalSize - memoryBlock.totalSize;
            }else{
                //erro
                console.log("erro");
            }
        }

        console.log(BlockList);

        this.setState({
            memoryBlockList: BlockList
        })
    }

    scheduler = () => {
        setInterval(() => {
            console.log("se passou 1 segundo");
            fulltime = listCores[0].fulltime;
            //console.log("teste - " + fulltime);
            quantum = this.state.quantum;
            listProcesses = [];

            let process;
            let block;
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
                        //memory
                        process = listProcesses[0];
                        //console.log(process)   
                        block = this.newMemoryBlock(process);
                        //console.log("antes do print do block");
                        //console.log(block);
                        //console.log("depois do print do block");
                        this.bestFit(block);

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

                //console.log(listCores[i].processId);
                fulltime = listCores[i].fulltime;
                //console.log("fulltime: " + fulltime);
                fulltime = fulltime - quantum;
                //console.log("quantum: " + quantum);
                //console.log("fulltime-quantum: " + fulltime);

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

                //console.log("tempo atual do core: " + listCores[i].totalTime);

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
                    <Text style={{ color: '#fff' }} >Ultimo Processo: {this.state.lastProcessInsertedId}</Text>
                </View>

                <View style={styles.memory}>
                    <Memory memoryFullSize={this.state.memoria} memoryBlockList={this.state.memoryBlockList} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Processes listProcesses={this.state.listProcesses}  memoryBlockList={this.state.memoryBlockList}/>
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
    memory: {
        marginTop: 80,

    }
});
