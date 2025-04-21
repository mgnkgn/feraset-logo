import { View, Text, StyleSheet, Image } from "react-native";

export default function Output() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Here's your logo! 🎉</Text>
      <Image
        source={{
          uri: "https://via.placeholder.com/300x300.png?text=Mock+Logo",
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FAFAFA",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFF",
  },
});
