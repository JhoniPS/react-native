import React, { useEffect, useState } from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repository, setRepository] = useState({});

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await api.get('/repositories');
        setRepository(response.data[0] || {});
      } catch (error) {
        console.log(error);
      }
    }

    fetchRepositories();
  }, []);

  async function handleLikeRepository(id) {
    try {
      const response = await api.post(`repositories/${id}/like`);
      setRepository(repository.map(item => (item.id === id ? response.data : item)));
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>{repository.title}</Text>
          <View style={styles.techsContainer}>
            {repository.techs && repository.techs.map((tech, index) => (
              <Text key={index} style={styles.tech}>
                {tech}
              </Text>
            ))}
          </View>
          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              testID={`repository-likes-${repository.id}`}
            >
              {repository.likes || 0} curtidas
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
