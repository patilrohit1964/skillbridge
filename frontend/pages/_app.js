import "@/styles/globals.css";
import { Provider } from "react-redux";
import store, { persistor } from "../redux/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
      <ToastContainer position="bottom-right" />
    </Provider>
  );
}
