import React, { useState, useEffect } from "react";
import {} from "react-native";
import { View, Text, StyleSheet, FlatList } from "react-native";

const PhotoNestedScreen = ({ route }) => {
  const [idPost, setIdPost] = useState(route.params.id);
  const [comments, setComments] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${idPost}`
        )
          .then((response) => response.json())
          .then((data) => {
            setComments((prevPosts) => [...prevPosts, ...data]);
          });
      } catch (e) {
        console.warn(e);
      } finally {
      }
    }
    prepare();
  }, [idPost]);

  return (
    <View style={styles.container}>
      <View style={styles.wrap_title}>
        <Text style={styles.title}>
          Comments Post title "{route.params.title}"
        </Text>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(comment) => comment.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.post__title}>{item.name}</Text>
            <Text style={styles.post__body}>{item.email}</Text>
            <Text style={styles.post__body}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 20,
  },
  wrap_title: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: "#7477ff",
    alignContent: "flex-start",
  },
  post: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#3faaff",
  },
  post__title: {
    fontFamily: "Asap-Regular",
    fontSize: 24,
    color: "#3faaff",
  },
  post__title: {
    fontSize: 14,
    color: "#7477ff",
  },
});

export default PhotoNestedScreen;
