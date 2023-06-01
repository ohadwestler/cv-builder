'use client'
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../redux/store";


type Props = {
  children?: React.ReactNode;
};

export const AuthenticationForm = ({ children }: Props) => {

  //  const rout = useRouter();
  return (
    <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
    </Provider>

  );
};