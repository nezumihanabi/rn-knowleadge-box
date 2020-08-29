import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";

const storage = new Storage({
  storageBackend: AsyncStorage,
});

export const getStorage = (key, setValue) => {
  try {
    storage
      .load({ key })
      .then((res) => setValue(res))
      .catch((err) => console.warn(err));
  } catch (e) {
    console.log(e);
  }
};

export const setStorage = (key, value) => {
  try {
    storage.save({
      key: key,
      data: value,
    });
  } catch (e) {
    console.log(e);
  }
};
