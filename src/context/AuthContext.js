import React, { createContext, useContext, useState } from "react";

const AuthContextType = {
  informationUser: null,
  signin: null,
  signout: null,
};

const AuthContext = createContext(AuthContextType);

export function AuthProvider({ children }) {
  let [informationUser, setInformationUser] = useState(null);
  
  let signin = async (credentials, callback, errorCallback) => {

    try {
         console.log("call sigin");
      // Thực hiện xác thực người dùng
      // Giả sử xác thực thành công và trả về thông tin người dùng
      // Set thông tin người dùng vào state

      // Giả lập thông tin người dùng
      if (credentials.username === "admin" && credentials.password === "123") {
        console.log("Login successful:", credentials);
        setInformationUser({
          username: credentials.username,
          role: "admin",
          name: "LCTB",
        });
        callback?.();
      }else {
        console.log("Login failed: Invalid credentials");
        errorCallback?.(new Error("Invalid credentials"));
      }
      
    } catch (error) {
      console.error("Login failed:", error);
      errorCallback?.(error);
    }
  };
  let signout = async (callback) => {
    try {
    } catch (e) {
      console.warn("Logout request failed:", e);
    } finally {
      setInformationUser(null);
      callback?.();
    }
  };

  let value = { informationUser, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
