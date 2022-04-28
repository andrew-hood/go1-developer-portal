import {
  ButtonFilled,
  ButtonMinimal,
  Checkbox,
  CheckboxGroup,
  Heading,
  IFrame,
  Modal,
  Text,
  View,
} from "@go1d/go1d";
import { useState } from "react";
import { useModal } from "react-modal-hook";
import SecretText from "../components/common/SecretText";
import { ClientApp } from "../services/authService";

const SCOPES = [
  "user.read",
  "user.write",
  "user.login.me",
  "portal.read",
  "portal.write",
  "lo.read",
  "lo.write",
  "enrollment.read",
  "enrollment.write",
  "webhook.read",
  "webhook.write",
];

const useModalWithClientLogin = () => {
  const [client, setClient] = useState<ClientApp>(null);
  const [selectedScopes, setSelectedScopes] = useState([]);

  const [showModal, hideModal] = useModal(
    () => (
      <Modal isOpen color="background" backgroundColor="accent" maxWidth={1100}>
        <Heading
          semanticElement="h3"
          visualHeadingLevel="Heading 3"
          marginBottom={5}
        >
          Login
        </Heading>
        <View flexDirection="row" justifyContent="space-between">
          <View width={["100%", "25%"]}>
            <Heading semanticElement="h4" visualHeadingLevel="Heading 4">
              Step 1
            </Heading>
            <Text marginBottom={4}>
              Select the scopes required for your app
            </Text>
            <CheckboxGroup
              mode="dark"
              backgroundColor="accent"
              name="scopes"
              options={SCOPES.map((scope) => ({
                label: scope,
                value: scope,
              }))}
              onChange={(e) => setSelectedScopes(e.target.value)}
            />
          </View>
          <View
            width="70%"
            color="default"
            backgroundColor="background"
            padding={4}
            borderRadius={3}
          >
            <Heading
              semanticElement="h4"
              visualHeadingLevel="Heading 4"
              color="contrast"
            >
              Step 2
            </Heading>
            <Text color="subtle" marginBottom={4}>
              Copy URL into your app code
            </Text>
            <SecretText
              ellipsis={false}
              visible={true}
              text={`https://auth.go1.com/oauth/authorize?response_type=token&client_id=${
                client.client_id
              }&redirect_uri=${client.redirect_uri}&scope=${selectedScopes.join(
                "%20"
              )}`}
            />
            <View flexDirection="row" marginTop="auto">
              <ButtonFilled
                color="accent"
                href={`https://auth.go1.com/oauth/authorize?response_type=token&client_id=${
                  client.client_id
                }&redirect_uri=${
                  client.redirect_uri
                }&scope=${selectedScopes.join("%20")}`}
              >
                Login
              </ButtonFilled>
              <ButtonMinimal onClick={hideModal}>Cancel</ButtonMinimal>
            </View>
          </View>
        </View>
      </Modal>
    ),
    [client, selectedScopes]
  );

  const showModalWithClient = (client?: ClientApp) => {
    setSelectedScopes([]);
    setClient(client);
    showModal();
  };

  const closeModal = () => {
    setSelectedScopes([]);
    setClient(null);
    showModal();
  };

  return [showModalWithClient, closeModal];
};

export default useModalWithClientLogin;
