import { ButtonMinimal, Dropdown } from "@go1d/go1d";
import IconEllipsis from "@go1d/go1d/build/components/Icons/Ellipsis";
import { useState } from "react";

const StateDropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      itemToString={(item) => item?.title}
      onOuterClick={() => setIsOpen(false)}
      placement="bottom-end"
      itemList={items}
      renderFunction={({ title, icon, color, onClick }) => (
        <ButtonMinimal
          width={140}
          borderRadius={0}
          color={color || "contrast"}
          justifyContent="flex-start"
          icon={icon}
          onClick={() => {
            setIsOpen(false);
            onClick();
          }}
        >
          {title}
        </ButtonMinimal>
      )}
    >
      {({ ref, getToggleButtonProps }) => (
        <ButtonMinimal
          {...getToggleButtonProps()}
          icon={IconEllipsis}
          innerRef={ref}
          color="contrast"
          onClick={() => setIsOpen(true)}
        />
      )}
    </Dropdown>
  );
};
export default StateDropdown;
