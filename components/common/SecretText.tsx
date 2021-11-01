import { View, Text, ButtonMinimal, NotificationManager, Label } from "@go1d/go1d";
import IconCopy from "@go1d/go1d/build/components/Icons/Copy";
import copy from "copy-to-clipboard";
import { useState } from "react";

const SecretText = ({ label, text, visible = false, ellipsis = true }: { label: string, text: string, visible?: boolean, ellipsis?: boolean }) => {
  const [hovering, setHovering] = useState<boolean>(false);

  const handleCopy = (label: string, text: string) => {
    copy(text);
    NotificationManager.success({
      message: (
        <Text fontWeight="semibold">{label} copied to clipboard</Text>
      ),
      options: {
        lifetime: 3000,
        isOpen: true,
      },
    });
  }

  return (
    <View
      backgroundColor="background"
      padding={3}
      marginBottom={3}
      borderRadius={2}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <Text color="subtle" fontSize={1} fontWeight="bold">{label}</Text>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontFamily="mono" ellipsis={ellipsis}>{visible || hovering ? text : '● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ●'}</Text>
        <ButtonMinimal zIndex={2} size="sm" icon={IconCopy} onClick={() => handleCopy(label, text)} />
      </View>
    </View>
  )
}
export default SecretText;