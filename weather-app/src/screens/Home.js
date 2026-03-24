import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";

import { api } from "../services/api";
import WeatherCard from "../components/WeatherCard";
import ForecastItem from "../components/ForecastItem";

export default function Home() {
  const [weather, setWeather] = useState({
    forecast: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await api.get(
          "?key=ba94c742&city_name=Recife,PE"
        );

        const data = response.data?.results;

        setWeather({
          ...data,
          forecast: data?.forecast || [],
        });

      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  // 🔥 Loading inicial
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando clima...</Text>
      </View>
    );
  }

  // 🔥 Segurança extra (caso API falhe)
  if (!weather || !weather.city) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Erro ao carregar dados 😢
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Card principal */}
      <WeatherCard data={weather} />

      {/* Título */}
      <Text style={styles.title}>Próximos dias</Text>

      {/* Lista horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {weather.forecast && weather.forecast.map((item, index) => (
          <ForecastItem key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f2027",
    padding: 20,
    paddingTop: 60,
  },
  loading: {
    flex: 1,
    backgroundColor: "#0f2027",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  scroll: {
    paddingVertical: 10,
  },
});