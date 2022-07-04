import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Dimensions } from "react-native";
import { changeIsModal } from "./../redax/auth/authOperations";
import Modal from "react-native-modal";

const ModalWindow = ({ children }) => {
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => state.auth);

  const [widthX, setWidthX] = useState(Dimensions.get("window").width / 1.2);
  const [heightY, setHeightY] = useState(Dimensions.get("window").height / 3);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width / 1.2;
      const height = Dimensions.get("window").height / 3;
      setWidthX(width);
      setHeightY(height);
    };
    dimensionsSubscription = Dimensions.addEventListener("change", onChange);
    return () => {
      dimensionsSubscription?.remove();
    };
  }, []);

  return (
    <Modal
      transparent={true}
      isVisible={modal}
      backdropColor="#636363"
      onBackdropPress={() => {
        dispatch(changeIsModal(false));
      }}
    >
      <View style={styles.wrapModalContent}>
        <View
          style={{
            ...styles.modalContent,
            width: widthX,
            height: heightY,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapModalContent: {
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
});

export default ModalWindow;
