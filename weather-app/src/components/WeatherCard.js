import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; 

export default function WeatherCard({ data }) {
  if (!data) return null;

  const getWeatherIcon = (conditionSlug) => {
    switch (conditionSlug) {
      case 'clear_day': return 'sun';
      case 'clear_night': return 'moon';
      case 'cloud':
      case 'cloudly_day':
      case 'cloudly_night': return 'cloud';
      case 'rain': return 'cloud-rain';
      case 'storm': return 'cloud-lightning';
      case 'snow': return 'cloud-snow';
      default: return 'cloud'; 
    }
  };

  const iconName = getWeatherIcon(data.condition_slug);

  return (
    <View style={styles.container}>
      {/* Cidade */}
      <Text style={styles.city}>{data.city ?? "--"}</Text>

      {/* Ícone Dinâmico do Clima */}
      <Feather name={iconName} size={90} color="#fff" style={styles.icon} />

      {/* Temperatura (com tamanho de destaque) */}
      <Text style={styles.temp}>{data.temp ?? "--"}°</Text>

      {/* Descrição */}
      <Text style={styles.desc}>{data.description ?? "--"}</Text>

      {/* Máxima e Mínima com setas indicativas */}
      <View style={styles.minMaxContainer}>
        <Feather name="arrow-up" size={18} color="#ff7675" />
        <Text style={styles.minMaxText}>{data?.forecast?.[0]?.max ?? "--"}°</Text>
        
        <Text style={styles.separator}>  |  </Text>
        
        <Feather name="arrow-down" size={18} color="#74b9ff" />
        <Text style={styles.minMaxText}>{data?.forecast?.[0]?.min ?? "--"}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.15)", 
    borderRadius: 25,
    padding: 30,
    marginBottom: 30,
    alignItems: "center", 
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  city: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
  icon: {
    marginVertical: 15, 
  },
  temp: {
    color: "#fff",
    fontSize: 80, 
    fontWeight: "bold",
  },
  desc: {
    color: "#e0e0e0",
    fontSize: 20,
    textTransform: "capitalize",
    marginTop: 5,
    marginBottom: 15,
  },
  minMaxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  minMaxText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 4,
    fontWeight: "500",
  },
  separator: {
    color: "#rgba(255,255,255,0.5)",
  },
});