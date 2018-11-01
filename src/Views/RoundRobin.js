import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Alert
} from "react-native";

import Header from "../Components/Header";
import Inputs from "../Components/Inputs";
import Buttons from "../Components/Buttons";
import { Processes } from "../Components/Processes";
import { Cores } from "../Components/Cores";
import { Memory } from "../Components/Memory";
import { AbortedProcesses } from "../Components/AbortedProcesses";

export class RoundRobin extends React.Component {
  static navigationOptions = {
    header: null
  };

  loadState = () => {
    const { navigation } = this.props;
    const state = navigation.getParam("state", "NO-ID");
    return state;
  };

  state = this.loadState();

  componentWillMount() {
    this.generateListProcesses(this.state.processos);
    this.generateListCores(this.state.cores);
  }

  generateListProcesses = nProcesses => {
    let listProcesses = [];
    for (let i = 0; i < nProcesses; i++) {
      const totalTime = this.getRandomIntProcessTotalTime();
      const bytesCost = this.getRandomIntProcessMemoryCostBytes();
      listProcesses.push({
        key: { i },
        totalTime: totalTime,
        fulltime: totalTime,
        processId: "p" + i,
        deadLine: 0,
        bytesCost: 50
        //bytesCost: bytesCost
      });
    }
    this.setState({
      listProcesses: listProcesses
    });
  };

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
      //bytesCost: bytesCost
      bytesCost: 51
    });
    let lastProcessInsertedId = list[list.length - 1].processId;
    this.setState({
      listProcesses: list,
      processos: list.length,
      lastProcessInsertedId
    });
  };

  generateListCores = nCores => {
    listCores = [];
    for (let i = 0; i < nCores; i++) {
      listCores.push({
        key: { i },
        totalTime: 0,
        processId: "",
        isWorking: false,
        timeProcessed: 0,
        fulltime: 0
      });
    }
    this.setState({
      listCores: listCores,
      cores: listCores.length
    });
  };

  newMemoryBlock(process) {
    let BlockList = this.state.memoryBlockList;
    let id;

    if (BlockList.length === 0) {
      id = 0;
    } else {
      id = BlockList[BlockList.length - 1].id + 1;
    }

    let memoryBlock = {
      isWorking: false,
      id: id,
      processId: process.processId,
      totalSize: process.bytesCost,
      unusedSize: this.totalSize - process.bytesCost,
      usedSize: process.bytesCost
    };

    return memoryBlock;
  }

  bestFit(memoryBlock) {
    let BlockList = this.state.memoryBlockList;
    //let memoryFreeSpace = this.state.memoriaFreeSpace;
    memoriaFreeSpace = parseInt(this.state.memoriaFreeSpace);

    let bestIndex = -1;
    //let bestSpace = Math.max();
    let bestSpace = Number.MAX_SAFE_INTEGER;
    let space = 0;
    for (let i = 0; i < BlockList.length; i++) {
      if (BlockList[i].isWorking === false) {
        //console.log("bloco ", BlockList[i], " está livre");
        //save index
        console.log(BlockList[i].totalSize);
        console.log(memoryBlock.totalSize);
        if (BlockList[i].totalSize - memoryBlock.totalSize >= 0) {
          space = BlockList[i].totalSize - memoryBlock.totalSize;
        } else {
          space = Number.MAX_SAFE_INTEGER;
        }
        //space = BlockList[i].totalSize - memoryBlock.totalSize;
        //console.log("space", space);
        //console.log("bestSpace", bestSpace);
        if (space < bestSpace) {
          bestSpace = space;
          bestIndex = i;
        }
      }
    }
    //console.log("bestSpace: ", bestSpace);
    //console.log("space: ", space);
    //console.log("bestIndex: ", bestIndex);

    if (bestIndex === -1) {
      if (memoriaFreeSpace >= memoryBlock.totalSize) {
        memoriaFreeSpace = memoriaFreeSpace - memoryBlock.totalSize;
        BlockList.push({
          isWorking: true,
          id: memoryBlock.id,
          processId: memoryBlock.processId,
          totalSize: memoryBlock.totalSize,
          unusedSize: memoryBlock.unusedSize,
          usedSize: memoryBlock.usedSize
        });
      } else {
        this.findAndRemoveProcessByProcessId(memoryBlock.processId);
      }
    } else {
      BlockList[bestIndex].isWorking = true,
        BlockList[bestIndex].processId = memoryBlock.processId,
        BlockList[bestIndex].usedSize = memoryBlock.totalSize
    }

    /*
    if (memoryFreeSpace >= memoryBlock.totalSize) {
      memoryFreeSpace = memoryFreeSpace - memoryBlock.totalSize;
      BlockList.push({
        isWorking: true,
        id: memoryBlock.id,
        processId: memoryBlock.processId,
        totalSize: memoryBlock.totalSize,
        unusedSize: memoryBlock.unusedSize,
        usedSize: memoryBlock.usedSize
      });
    } else {
      let bestIndex = -1;
      let bestSpace = Math.max();
      for (let i = 0; i < BlockList.length; i++) {
        if (BlockList[i].isWorking === false) {
          //save index
          let space = BlockList[i].totalSize - memoryBlock.totalSize;
          if (space < bestSpace) {
            bestIndex = i;
          }
        }
      }

      if (bestIndex !== -1) {
        BlockList[bestIndex].isWorking = true;
        BlockList[bestIndex].id = "novo";
        BlockList[bestIndex].processId = memoryBlock.processId;
        BlockList[bestIndex].unusedSize =
          memoryBlockList[bestIndex].totalSize - memoryBlock.totalSize;
      } else {
        //erro
        //console.log("erro ", memoryBlock.processId);
        this.findAndRemoveProcessByProcessId(memoryBlock.processId);
      }
      
    }
    */
    //console.log(BlockList);

    this.setState({
      memoryBlockList: BlockList,
      memoriaFreeSpace: memoriaFreeSpace
    });
  }

  findAndRemoveProcessByProcessId(processId) {
    listProcesses = this.state.listProcesses;
    abortedProcesses = this.state.abortedProcesses;
    for (let i = 0; i < listProcesses.length; i++) {
      if (listProcesses[i].processId === processId) {
        //return listProcesses[i];
        //console.log("aqui ", listProcesses[i].processId);
        abortedProcesses.push(listProcesses.shift());
      }
    }

    this.setState({
      listProcesses: listProcesses,
      abortedProcesses: abortedProcesses
    });
  }

  resetBlockByProcessId(idProcess) {
    let list = this.state.memoryBlockList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].processId === idProcess) {
        list[i].isWorking = false;
        list[i].processId = "";
        list[i].unusedSize = list[i].totalSize;
        list[i].usedSize = 0;
      }
    }

    this.setState({
      memoryBlockList: list
    });
  }

  findProcessByProcessId(processId) { }

  scheduler = () => {
    setInterval(() => {
      console.log("se passou 1 segundo");
      fulltime = listCores[0].fulltime;
      //console.log("teste - " + fulltime);
      quantum = this.state.quantum;
      listProcesses = [];
      memoriaFreeSpace = parseInt(this.state.memoriaFreeSpace);

      let process;
      let block;
      for (let i = 0; i < this.state.listProcesses.length; i++) {
        listProcesses[i] = this.state.listProcesses[i];
      }

      listCores = [];
      for (let i = 0; i < this.state.listCores.length; i++) {
        listCores[i] = this.state.listCores[i];
      }

      memoryBlockList = this.state.memoryBlockList;
      for (let i = 0; i < listCores.length; i++) {
        if (listCores[i].isWorking === false) {
          if (listProcesses[0] !== undefined) {
            //memory
            process = listProcesses[0];
            //console.log("processo", process)

            isBlockInMemory = false;
            for (let j = 0; j < memoryBlockList.length; j++) {
              //console.log("na memoria ", memoryBlockList[j].processId);
              //console.log("comparando ", process.processId);

              // console.log(
              //   "bloco de memoria ",
              //   memoryBlockList[j].id,
              //   " está trabalhando: ",
              //   memoryBlockList[j].isWorking
              // );
              if (memoryBlockList[j].processId === process.processId) {
                isBlockInMemory = true;
                //console.log("estado1 ", isBlockInMemory);
              }
              // if (memoryBlockList[j].processId === process.processId) {
              //   isBlockInMemory = true;
              //   console.log("bloco já está na memoria");
              // }
            }

            if (isBlockInMemory) {
              //console.log("processo", listProcesses[0].bytesCost)

              listCores[i] = listProcesses.shift();
              listCores[i].isWorking = true;
            } else {
              //console.log("processo1", listProcesses[0]);

              block = this.newMemoryBlock(process);
              if (memoriaFreeSpace - block.totalSize >= 0) {
                //memoriaFreeSpace = memoriaFreeSpace - block.totalSize;
              }
              this.bestFit(block);

              listCores[i] = listProcesses.shift();
              listCores[i].isWorking = true;
            }

            /*
            block = this.newMemoryBlock(process);
            if (memoriaFreeSpace - block.totalSize >= 0) {
              memoriaFreeSpace = memoriaFreeSpace - block.totalSize;
            }
            this.bestFit(block);

            listCores[i] = listProcesses.shift();
            listCores[i].isWorking = true;
            */
          }
        }
      }

      for (let i = 0; i < listCores.length; i++) {
        listCores[i].totalTime--;

        if (listCores[i].totalTime === 0) {
          //console.log("processo finalizado ", listCores[i].processId);
          //memoriaFreeSpace = memoriaFreeSpace + listCores[i].bytesCost;
          //console.log("bytesCost: ", listCores[i].bytesCost);
          //console.log("processo2", listProcesses[0]);
          //console.log("listaCores: ", listCores)
          //console.log("listaProcesses: ", listProcesses)

          this.resetBlockByProcessId(listCores[i].processId);

          listCores[i] = {
            totalTime: 0,
            processId: "",
            isWorking: false
          };
        }
        if (listCores[i].isWorking === false) {
          listCores[i] = {
            totalTime: 0,
            processId: "",
            isWorking: false
          };
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
          //console.log(listCores[i]);
          listProcesses.push({
            key: Math.random(),
            totalTime: fulltime,
            fulltime: fulltime,
            processId: listCores[i].processId,
            deadLine: 0,
            bytesCost: listCores[i].bytesCost
          });

          listCores[i] = {
            key: { i },
            totalTime: 0,
            processId: "",
            isWorking: false,
            timeProcessed: 0,
            fulltime: 0
          };
        }

        listCores[i].timeProcessed = timeProcessed;
      }

      this.setState({
        listProcesses: listProcesses,
        listCores: listCores,
        memoriaFreeSpace: memoriaFreeSpace
      });
    }, 1000);
  };

  render() {
    return (
      <ScrollView style={styles.mom}>
        {/* <Text style={{ paddingTop: 20 }}>Cores: {this.state.cores}, Processos: {this.state.processos}, Memoria: {this.state.memoria}, Quantum: {this.state.quantum}, QuantumHasValue: {this.state.quantumHasValue ? "true" : "false"}</Text> */}

        <View style={styles.newProcessButtonView}>
          <View style={styles.buttons}>
            <Button title="Iniciar" color="#800080" onPress={this.scheduler} />
          </View>
          <View style={styles.buttons}>
            <Button
              title="Novo processo aleatório"
              color="#800080"
              onPress={this.newProcessToListProcesses}
            />
          </View>
          <Text style={{ color: "#fff" }}>
            Ultimo Processo: {this.state.lastProcessInsertedId}
          </Text>
        </View>

        <View style={styles.memory}>
          <Memory
            memoryFullSize={this.state.memoria}
            memoryBlockList={this.state.memoryBlockList}
            memoriaFreeSpace={this.state.memoriaFreeSpace}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View>
            <Processes
              listProcesses={this.state.listProcesses}
              memoryBlockList={this.state.memoryBlockList}
            />
          </View>
          <View style={{ marginLeft: 5 }}>
            <AbortedProcesses abortedProcesses={this.state.abortedProcesses} />
          </View>
          <View style={{ marginLeft: 1 }}>
            <Cores
              listCores={this.state.listCores}
              quantum={this.state.quantum}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mom: {
    backgroundColor: "#660066"
  },
  newProcessButtonView: {
    paddingTop: 20,
    marginTop: 10,
    height: 30,
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 20,
    paddingTop: 20
  },
  buttons: {
    marginBottom: 5
  },
  memory: {
    marginTop: 80
  }
});
