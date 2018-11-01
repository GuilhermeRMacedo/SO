import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

const process = props => (
  <View style={styles.processo}>
    <View style={{ flexDirection: "row"}}>
      <View>
        <Text style={{ color: "#fff", marginLeft: 1 }}>{props.bytesCost}</Text>
      </View>
      <View style={[styles.tempoTotal, {marginLeft: (props.bytesCost) ? 24 : 50}]}>
        <Text style={{ color: "#fff" }}>{props.totalTime}</Text>
      </View>
    </View>
    <View style={styles.idprocesso}>
      <Text style={{ color: "#fff" }}>{props.processId}</Text>
    </View>

    {props.deadLine !== 0 ? (
      <Text style={styles.deadLine}>{props.deadLine}</Text>
    ) : (
      <Text />
    )}
    {/* <Text style={styles.deadLine}>{props.deadLine}</Text> */}
  </View>
);

const styles = StyleSheet.create({
  processo: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#fff",
    marginBottom: 2
  },
  idprocesso: {
    alignItems: "center",
    marginTop: 5
  },
  tempoTotal: {
    // marginLeft: 25
  },
  deadLine: {
    marginLeft: 30,
    marginTop: 6,
    color: "#fff"
  }
});

export default process;
