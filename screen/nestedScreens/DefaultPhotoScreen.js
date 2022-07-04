import React, { useState, useEffect } from "react";
import {} from "react-native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SignOut from "./../../components/SignOut";

const DefaultPhotoScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        await fetch("https://jsonplaceholder.typicode.com/posts/")
          .then((response) => response.json())
          .then((data) => {
            setPosts((prevPosts) => [...prevPosts, ...data]);
          });
      } catch (e) {
        console.warn(e);
      } finally {
      }
    }

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <SignOut title="NestedPostScreen" />

      {posts && (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id}
          initialNumToRender={100}
          maxToRenderPerBatch={0}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("PhotoNested", item)}
            >
              <View style={styles.post}>
                <Text style={styles.post__title}>{item.title}</Text>
                <Text style={styles.post__body}>{item.body}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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

export default DefaultPhotoScreen;
