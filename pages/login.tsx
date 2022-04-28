import { signIn, useSession } from "next-auth/react";
import {
  ButtonFilled,
  Form,
  Field,
  TextInput,
  View,
  ButtonMinimal,
  foundations,
} from "@go1d/go1d";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const coverImage =
  "https://images.unsplash.com/photo-1631477076114-9123f721b9dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80";

export default function Login() {
  const { status } = useSession();
  const { push } = useRouter();
  const [portalField, showPortalField] = useState<boolean>(false);

  const handleLogin = (values) => {
    signIn("credentials", values);
  };

  useEffect(() => {
    if (status === "authenticated") {
      push("/dashboard");
    }
  }, [status]);

  return (
    <Layout title="Login" withSidebar={false} withHeader={false}>
      <View flexDirection="row" height="100vh">
        <View
          flexBasis={0.55}
          height="100%"
          position="relative"
          css={{
            "&:before": {
              content: '" "',
              display: "block",
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${coverImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundColor: foundations.colors.accent,
              backgroundBlendMode: "screen",
            },
          }}
        />
        <View flexBasis={0.45} paddingX={[3, 6, 9]} paddingTop={8}>
          <Image src="/login.svg" width={250} height={250} />
          <Form initialValues={{}} onSubmit={handleLogin}>
            <Field
              label="Username"
              name="username"
              size="lg"
              component={TextInput}
              required
            />
            <Field
              label="Password"
              name="password"
              size="lg"
              component={TextInput}
              type="password"
              required
            />
            {!portalField ? (
              <ButtonMinimal onClick={() => showPortalField(true)}>
                Add portal
              </ButtonMinimal>
            ) : (
              <View backgroundColor="faint" padding={5}>
                <Field
                  label="Portal URL"
                  name="instance"
                  component={TextInput}
                  description="Only enter a portal for managing your portal apps"
                />
              </View>
            )}
            <ButtonFilled
              type="submit"
              color="accent"
              size="lg"
              marginTop={5}
              disabled={status === "loading"}
            >
              Login
            </ButtonFilled>
          </Form>
        </View>
      </View>
    </Layout>
  );
}
