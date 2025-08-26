import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetailPage() {
  const { metal, data } = useLocalSearchParams();
  const metalData = data ? JSON.parse(data as string) : null;
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  if (!metalData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>⚠ No Data Available</Text>
      </View>
    );
  }

  const trend = metalData.price >= metalData.prevClose ? "📈 Up" : "📉 Down";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{metal} Details</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>💰 Current Price:</Text>
        <Text style={styles.value}>₹ {metalData.price.toFixed(2)} / g</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>📊 Previous Close:</Text>
        <Text style={styles.value}>₹ {metalData.prevClose.toFixed(2)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>⏱ Last Updated:</Text>
        <Text style={styles.value}>{formatTime(metalData.timestamp)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>🕒 Current Time:</Text>
        <Text style={styles.value}>{formatTime(currentTime)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>📌 Today's Trend:</Text>
        <Text style={[styles.value, { color: trend.includes('Up') ? '#4CAF50' : '#F44336' }]}>
          {trend}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#111", 
    padding: 20,
  },
  title: { 
    color: "#FFD700", 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 30,
    textAlign: 'center'
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center'
  },
  label: {
    color: "#aaa",
    fontSize: 16,
    flex: 1
  },
  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1
  },
  error: { 
    color: "red", 
    fontSize: 20,
    textAlign: 'center'
  },
});
