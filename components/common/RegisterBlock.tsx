import Image from 'next/image';
import { ButtonFilled, Container, Heading, Text, View } from "@go1d/go1d"

const RegisterBlock = () => {
  return (
    <View backgroundColor="black">
      <Container
        flexDirection={['column','row']}
        contain="wide"
        paddingY={9}
        paddingX={[5, 0]}
      >
        <View width={300}>
          <Image src="/login.svg" width={300} height={300} />
        </View>
        <View flexWrap="wrap" flexGrow={1} flexShrink={1} paddingLeft={6}>
          <Heading fontFamily="mono" semanticElement="h2" visualHeadingLevel="Heading 2" marginBottom={4}>Don’t have an account?</Heading>
          <Text fontFamily="mono">You can start using your own Go1 portal data immediately using the developer settings in your portal. If you need to create a generic integration to allow other Go1 portals to use your app, you can contact the Go1 to register a public application.</Text>
          <View flexDirection="row" marginTop={6}>
            <ButtonFilled color="complementary">Contact Go1</ButtonFilled>
          </View>
        </View>
      </Container>
    </View>
  )
}
export default RegisterBlock;