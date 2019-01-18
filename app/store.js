import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
import { persistStore, persistCombineReducers } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import reducer from "./reducers";
import { AsyncStorage } from "react-native";

const persistConfig = {
  key: "root", // Storageに保存されるキー名を指定する
  storage: AsyncStorage, // 保存先としてlocalStorageがここで設定される
  whitelist: ["auth"], // Stateは`todos`のみStorageに保存する
  blacklist: ["create", "favorite"] // `visibilityFilter`は保存しない
};
const persistedReducer = persistCombineReducers(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export const persistor = persistStore(store);
export default store;
