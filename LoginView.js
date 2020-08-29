/* eslint-disable react/prop-types */
import React from "react";
import { fbSignUp, fbLogin } from "./util/firebase.js";
import { headerStyle } from "./constant/style.js";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginView(props) {
  const { setUser } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [needSignUp, setNeedSignUp] = React.useState(false);
  const [success, setSuccess] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);
  const onLoginSubmit = async () => {
    const result = await fbLogin(email, password);
    if (result) {
      setSuccess("ログイン認証に成功しました");
      setUser(result);
    } else {
      setError("ログインに失敗しました");
    }
  };
  const onSignUpSubmit = async () => {
    const result = await fbSignUp(email, password);
    if (result) {
      setSuccess("ユーザ登録に成功しました");
      setUser(result);
    } else {
      setError("ユーザ登録に失敗しました");
    }
  };
  React.useEffect(() => {
    setError(undefined);
  }, [needSignUp]);
  return (
    <View>
      {!needSignUp ? (
        <>
          <Text style={headerStyle}>ログイン</Text>
          <Text style={{ fontSize: "14px" }}>Email</Text>
          <TextInput
            style={{ height: "30px", margin: "10px" }}
            placeholder={"test@example.jp"}
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <Text style={{ fontSize: "14px" }}>Password</Text>
          <TextInput
            style={{ height: "30px", margin: "10px" }}
            placeholder={"********"}
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
          <Button title="認証" onPress={onLoginSubmit} />
          <br />
          <Button title="ユーザー登録" onPress={() => setNeedSignUp(true)} />
        </>
      ) : (
        <>
          <Text style={headerStyle}>ユーザー登録</Text>
          <Text style={{ fontSize: "14px" }}>Email</Text>
          <TextInput
            style={{ height: "30px", margin: "10px" }}
            placeholder={"test@example.jp"}
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <Text style={{ fontSize: "14px" }}>Password</Text>
          <TextInput
            style={{ height: "30px", margin: "10px" }}
            placeholder={"********"}
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
          <Button title="登録" onPress={onSignUpSubmit} />
          <br />
          <Button
            title="ログイン画面に戻る"
            onPress={() => setNeedSignUp(false)}
          />
        </>
      )}
      {success && (
        <Text style={{ color: "blue", fontSize: "16px" }}>{success}</Text>
      )}
      {error && <Text style={{ color: "red", fontSize: "16px" }}>{error}</Text>}
    </View>
  );
}
