import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../Components/Header'
import Inputs from '../Components/Inputs'
import Buttons from '../Components/Buttons'
import Processes from '../Components/Processes'
import Cores from '../Components/Cores'

export class Scheduler extends React.Component {
    static navigationOptions = {
        header: null
    };

    setState = () => {
        const { navigation } = this.props;
        const state = navigation.getParam('state', 'NO-ID');
        return state;
    }

    state = this.setState();

    render() {
        // const { navigation } = this.props;
        // const state = navigation.getParam('state', 'NO-ID');
        return (
            <View style={styles.mom}>
                {/* <Text style={{ paddingTop: 20 }}>Cores: {state.cores}, Processos: {state.processos}, Quantum: {state.quantum}, QuantumHasValue: {state.quantumHasValue ? "true" : "false"}</Text> */}
                <Text style={{ paddingTop: 20 }}>Cores: {this.state.cores}, Processos: {this.state.processos}, Quantum: {this.state.quantum}, QuantumHasValue: {this.state.quantumHasValue ? "true" : "false"}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Processes />
                    </View>
                    <View style={{ marginLeft: 110 }}>
                        <Cores />
                    </View>
                </View>

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
