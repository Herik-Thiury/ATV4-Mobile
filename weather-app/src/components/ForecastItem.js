import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ForecastItem({ item }) {
  const getForecastIcon = (condition) => {
    switch (condition) {
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

  const iconName = getForecastIcon(item.condition);

  return (
    <View style={styles.container}>
      {/* Dia da semana */}
      <Text style={styles.day}>{item.weekday}</Text>
      
      {/* Ícone do clima para aquele dia */}
      <Feather name={iconName} size={28} color="#fff" style={styles.icon} />
      
      {/* Temperatura Máxima */}
      <Text style={styles.maxTemp}>{item.max}°</Text>
      
      {/* Temperatura Mínima */}
      <Text style={styles.minTemp}>{item.min}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)", 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    minWidth: 85, 
  },
  day: {
    color: "#e0e0e0",
    fontSize: 16,
    fontWeight: "500",
  },
  icon: {
    marginVertical: 12, 
  },
  maxTemp: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  minTemp: {
    color: "rgba(255, 255, 255, 0.6)", 
    fontSize: 14,
    marginTop: 4,
  },
});