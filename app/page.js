'use client'

import { StoreProvider } from "easy-peasy";
import store from "@/store";
import Wrapper from "./components/Wrapper";

export default function Home() {
  return (
    <StoreProvider store={store}>
      <Wrapper />
    </StoreProvider>
  );
}
