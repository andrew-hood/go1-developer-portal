import { ButtonFilled, ButtonMinimal, Field, Form, Heading, Modal, TextInput, View } from "@go1d/go1d";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useModal } from "react-modal-hook";
import { ClientApp, createAuthClient, getAuthClients, updateAuthClient } from "../../services/authService";

const NewClientAuthForm = ({ hideModal, onCreate, client }: { hideModal, onCreate, client?: ClientApp }) => {
  const { data: session } = useSession();

  const handleSaveAuthClient = async (values) => {
    try {
      if (client) {
        await updateAuthClient(session?.accessToken as string, client.client_id, values);
      } else {
        await createAuthClient(session?.accessToken as string, values);
      }
      
      getAuthClients(session?.accessToken as string).then(onCreate);
      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      initialValues={{
        client_name: client?.client_name,
        redirect_uri: client?.redirect_uri,
      }}
      onSubmit={(values) => handleSaveAuthClient(values)}
    >
      <Field
        label="Client Name"
        name="client_name"
        component={TextInput}
        required
      />
      <Field
        label="Redirect URI"
        name="redirect_uri"
        component={TextInput}
        required
      />
      <View flexDirection="row" alignItems="center" marginTop={5}>
        <ButtonFilled
          type="submit"
          color="complementary"
        >
          Save
        </ButtonFilled>
        <ButtonMinimal color="white" onClick={hideModal} marginLeft={3}>Cancel</ButtonMinimal>
      </View>
    </Form>
  )
}

const useModalWithClient = (onCreate) => {
  const [client, setClient] = useState<ClientApp>(null);

  const [showModal, hideModal] = useModal(() => (
    <Modal isOpen color="white" contentPadding={7}>
      <Heading semanticElement="h3" visualHeadingLevel="Heading 3" color="white" marginBottom={6}>Client App</Heading>
      <NewClientAuthForm hideModal={hideModal} onCreate={onCreate} client={client} />
    </Modal>
  ), [client]);

  const showModalWithClient = (client?: ClientApp) => {
    setClient(client);
    showModal();
  }

  const closeModal = () => {
    setClient(null);
    showModal();
  }

  return [showModalWithClient, closeModal];
}

export default useModalWithClient;