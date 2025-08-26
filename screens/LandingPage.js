import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useRouter } from 'expo-router';

const API_BASE = "https://api.metals.dev/v1/latest?api_key=LWRWTV4KRVFKM9AG2LWG433AG2LWG&currency=INR&unit=g";

export default function LandingPage() {
  const router = useRouter();
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState({ gold: true, silver: true, platinum: true });
  const [error, setError] = useState({ gold: null, silver: null, platinum: null });
  const [currentTime, setCurrentTime] = useState(Date.now());

  const fetchMetalPrice = async (metal) => {
    try {
      setLoading((prev) => ({ ...prev, [metal]: true }));
      setError((prev) => ({ ...prev, [metal]: null }));

      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const json = await res.json();
      console.log('API Response:', JSON.stringify(json, null, 2));
      if (json.status !== "success") throw new Error("Invalid API response");

      const value = json.metals[metal];
      // Use current timestamp since the API doesn't provide one
      const timestamp = Date.now();

      console.log(`Fetched ${metal} price:`, value, 'at:', new Date(timestamp).toLocaleString());

      setPrices((prev) => ({
        ...prev,
        [metal]: {
          price: value,
          timestamp,
          prevClose: value - Math.random() * 10, // mock prev close
        },
      }));
    } catch (err) {
      setError((prev) => ({ ...prev, [metal]: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, [metal]: false }));
    }
  };

  useEffect(() => {
    // Initial fetch
    ["gold", "silver", "platinum"].forEach((m) => fetchMetalPrice(m));
    
    // Update time every second
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format time with moving seconds
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const renderCard = (metal, displayName, color) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/details",
            params: {
              metal: displayName,
              data: JSON.stringify(prices[metal]),
            },
          })
        }
        disabled={loading[metal] || error[metal]}
      >
        {loading[metal] ? (
          <ActivityIndicator size="large" color={color} />
        ) : error[metal] ? (
          <Text style={styles.error}>❌ {error[metal]}</Text>
        ) : (
          <>
            <Text style={styles.title}>{displayName}</Text>
            <Text style={[styles.price, { color }]}>
              ₹ {prices[metal]?.price.toFixed(2)} / g
            </Text>
            <Text style={styles.time}>
              ⏱ {formatTime(currentTime)}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Refresh Button */}
      <View style={styles.refreshBtn}>
        <Button title="🔄 Refresh" onPress={() => fetchMetalPrice(metal)} color={color} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderCard("gold", "Gold", "#FFD700")}
      {renderCard("silver", "Silver", "#C0C0C0")}
      {renderCard("platinum", "Platinum", "#E5E4E2")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#111" },
  card: { backgroundColor: "#222", padding: 20, borderRadius: 12, marginBottom: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  price: { fontSize: 18, marginTop: 5 },
  time: { color: "#aaa", marginTop: 5, fontSize: 16 },
  error: { color: "red", fontSize: 16 },
  refreshBtn: { marginTop: 10 },
});

