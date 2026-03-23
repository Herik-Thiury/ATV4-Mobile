import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ForecastItem({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.day}>{item.weekday}</Text>
      <Text style={styles.temp}>
        {item.max}° / {item.min}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2a5298",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    alignItems: "center",
  },
  day: {
    color: "#fff",
    marginBottom: 5,
  },
  temp: {
    color: "#fff",
    fontWeight: "bold",
  },
});