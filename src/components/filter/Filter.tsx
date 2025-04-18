import React, { FC, CSSProperties } from "react";
import { Menu, MenuButton } from "./filterStyled";

export interface FilterOption {
  value: string,
  label: string  
}

export interface FilterProps{
  options: FilterOption[],
  selected: string,
  onSelect: (value: string) => void,
  style?: CSSProperties; 
}

export const Filter: FC<FilterProps> = ({ options, selected, onSelect, style }) => {
    return (
      <Menu style={style}>
        {options.map((option) => (
          <MenuButton
            key={option.value}
            active = {selected === option.value}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </MenuButton>
        ))}
      </Menu>
    );
  };