import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import MiniBlock from './MiniBlock'

const page = (props) => (
    <View style={styles.pagina}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Page 0</Text>

        {/* lista de blocos(somente identificadores) */}

        <View style={{flexDirection: 'row'}}>
            <MiniBlock 
                id={'b0'}
                isWorking={'T'}
                processId={'p0'}
            />

            <MiniBlock 
                id={'b1'}
                isWorking={'F'}
                processId={''}
            />

            <MiniBlock 
                id={'b3'}
                isWorking={'T'}
                processId={'p5'}
            />

            <MiniBlock 
                id={'b4'}
                isWorking={'T'}
                processId={'p8'}
            />
            
        </View>
        <View style={{flexDirection: 'row'}}>
            <MiniBlock 
                id={'b5'}
                isWorking={'F'}
                processId={''}
            />

            <MiniBlock 
                id={'b6'}
                isWorking={'F'}
                processId={''}
            />

            <MiniBlock 
                id={'b7'}
                isWorking={'T'}
                processId={'p12'}
            />

            <MiniBlock 
                id={'b8'}
                isWorking={'T'}
                processId={'p19'}
            />
            
        </View>

    </View>
)

const styles = StyleSheet.create({
    pagina: {
        width: 124,
        height: 150,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#fff",
        marginBottom: 2
    }
})

export default page;