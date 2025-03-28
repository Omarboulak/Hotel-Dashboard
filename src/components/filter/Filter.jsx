import React from "react";
import { Menu, MenuButton } from "./filterStyled";

export const Filter = ({ options, selected, onSelect, style }) => {
    return (
      <Menu style={style}>
        {options.map((option) => (
          <MenuButton
            key={option.value}
            active={selected === option.value}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </MenuButton>
        ))}
      </Menu>
    );
  };