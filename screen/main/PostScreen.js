import React, { useState, useEffect } from "react";
import ModalWindow from "./../../components/ModalWindow";
import Loadingspin from "./../../components/Loadingspin";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SignOut from "./../../components/SignOut";

import {
  addAllPosts,
  addCommitsToState,
} from "./../../redax/dashboard/posts/postsOperations";
import { changeIsModal } from "./../../redax/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "react-native-snackbar-component";

function PostScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [islLoading, setIslLoading] = useState(true);

  const dispatch = useDispatch();

  const { posts, comments } = useSelector((state) => state.post);

  useEffect(() => {
    prepare();
  }, []);

  const prepare = async () => {
    setIslLoading(true);
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((response) => response.json())
        .then((data) => {
          dispatch(addAllPosts(data));
        });
    } catch (e) {
      setIsVisible(!isVisible);
      console.warn(e);
    } finally {
      setIslLoading(false);
    }
  };

  const handleModalFetch = async (Id) => {
    setIslLoading(true);
    dispatch(changeIsModal(true));
    try {
      await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${Id}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(addCommitsToState(data));
        });
    } catch (e) {
      console.warn(e);
    } finally {
      setIslLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {islLoading ? (
        <Loadingspin />
      ) : (
        <>
          <SignOut title="PostScreen" />

          {comments && (
            <ModalWindow>
              <FlatList
                data={comments}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => (
                  <View
                    key={item.email}
                    style={{
                      ...styles.post,
                      marginHorizontal: 20,
                      marginVertical: 20,
                    }}
                  >
                    <Text style={styles.post__title}>{item.name}</Text>
                    <Text style={styles.post__email}>{item.email}</Text>
                    <Text style={styles.post__body}>{item.body}</Text>
                  </View>
                )}
              />
            </ModalWindow>
          )}

          {posts && (
            <FlatList
              data={posts}
              keyExtractor={(item, index) => String(index)}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    handleModalFetch(item.id);
                  }}
                >
                  <View key={item.id} style={styles.post}>
                    <Text style={styles.post__title}>{item.title}</Text>
                    <Text style={styles.post__body}>{item.body}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
      <View>
        <Snackbar
          containerStyle={styles.snackbar}
          visible={isVisible}
          textMessage="Error! Posts didn't load."
          actionHandler={() => prepare()}
          actionText="Repeat request"
          autoHidingTime={5000}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 20,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
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
    fontSize: 20,
    color: "#3faaff",
    paddingBottom: 10,
  },
  post__email: {
    fontFamily: "FjallaOne-Regular",
    paddingBottom: 5,
    color: "#7477ff",
  },
  post__body: {
    fontFamily: "FjallaOne-Regular",
  },
  snackbar: {
    borderRadius: 10,
  },
});

export default PostScreen;
