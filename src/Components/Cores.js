import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Core from './Core'

export class Cores extends React.Component {

    render() {

        // let cores = [];
        // for (let i = 0; i < this.props.nCores; i++) {
        //     cores.push(<Core
        //         key = {i}
        //         totalTime=""
        //         processId=""
        //     />)
        // }

        return (
            <View style={styles.cores}>
                <Text style={{ fontSize: 12, color: '#fff' }}>Cores</Text>
                {/* <Core
                    totalTime=""
                    processId=""
                />
                <Core
                    totalTime=""
                    processId=""
                /> */}

                {/* {cores} */}

                {this.props.listCores.map(i => {
                    return <Core
                        key = {Math.random()}
                        totalTime={i.totalTime}
                        processId={i.processId}
                    />
                })}


            </View>
        )
    }
}



const styles = StyleSheet.create({
    cores: {
        borderColor: '#fff',
        borderRadius: 2,
        borderWidth: 1,
        width: 78,
        marginLeft: 30,
        marginTop: 40,
        alignItems: 'center'
    }
})

// export default cores;