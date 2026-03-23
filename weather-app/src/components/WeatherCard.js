import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <View style={styles.container}>
      {/* Cidade */}
      <Text style={styles.city}>{data.city ?? "--"}</Text>

      {/* Temperatura */}
      <Text style={styles.temp}>{data.temp ?? "--"}°</Text>

      {/* Descrição */}
      <Text style={styles.desc}>{data.description ?? "--"}</Text>

      {/* Min e Max */}
      <Text style={styles.minMax}>
        Max.: {data?.forecast?.[0]?.max ?? "--"}° | 
        Min.: {data?.forecast?.[0]?.min ?? "--"}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e3c72",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
  },
  city: {
    color: "#fff",
    fontSize: 18,
  },
  temp: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
    marginVertical: 10,
  },
  desc: {
    color: "#fff",
    fontSize: 16,
  },
  minMax: {
    color: "#ccc",
    marginTop: 5,
  },
});