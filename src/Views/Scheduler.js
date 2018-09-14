import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../Components/Header'
import Inputs from '../Components/Inputs'
import Buttons from '../Components/Buttons'
import Processes from '../Components/Processes'
import Cores from '../Components/Cores'

export default class Scheduler extends React.Component {

    render() {
        return (
            <View style={styles.mom}>

                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Processes />
                    </View>
                    <View style={{ marginLeft: 110 }}>
                        <Cores />
                    </View>
                </View>

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