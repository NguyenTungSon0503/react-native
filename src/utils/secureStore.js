import * as SecureStore from "expo-secure-store";

export const saveToSecureStore = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getValueFor = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    throw new Error("No values stored under that key.");
  }
};
