import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailPage({ route }) {
  const { metal, data } = route.params;

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>⚠ No Data Available</Text>
      </View>
    );
  }

  const trend = data.price >= data.prevClose ? "📈 Up" : "📉 Down";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{metal} Details</Text>
      <Text style={styles.item}>💰 Current Price: ₹ {data.price.toFixed(2)} / g</Text>
      <Text style={styles.item}>📊 Previous Close: ₹ {data.prevClose.toFixed(2)}</Text>
      <Text style={styles.item}>⏱ Time: {new Date(data.timestamp).toLocaleString()}</Text>
      <Text style={styles.item}>📌 Today’s Trend: {trend}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20, justifyContent: "center" },
  title: { color: "#FFD700", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  item: { color: "#fff", fontSize: 18, marginVertical: 5 },
  error: { color: "red", fontSize: 20 },
});
