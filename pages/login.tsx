import { signIn } from "next-auth/react"
import { ButtonFilled, Form, Field, Label, TextInput, View } from '@go1d/go1d'
import IconGo1Logo from "@go1d/go1d/build/components/Icons/Go1Logo";
import Layout from "../components/common/layout";
import RegisterBlock from '../components/common/RegisterBlock';

export default function Login() {

  const image = 'https://images.unsplash.com/photo-1630283018262-d0df4afc2fef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80';

  const handleLogin = (values) => {
    signIn('credentials', values);
  }

  return (
    <Layout title="Login">
      <View width={400} marginX="auto" paddingY={9}>
        <Form initialValues={{}} onSubmit={handleLogin}>
          <Field
            label="Username"
            name="username"
            component={TextInput}
            required
          />
          <Field
            label="Password"
            name="password"
            component={TextInput}
            type="password"
            required
          />
          <View flexDirection="row">
            <ButtonFilled
              type="submit"
              color="complementary"
              marginTop={3}
            >
              Login
            </ButtonFilled>
          </View>
        </Form>
      </View>
      
      <RegisterBlock />
    </Layout>
  )
}