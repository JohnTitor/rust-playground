import React from 'react';

import MenuItem from './MenuItem';

type Button = JSX.IntrinsicElements['button'];

interface ButtonMenuItemProps extends Button {
  name: string;
}

const ButtonMenuItem: React.FC<ButtonMenuItemProps> = ({ name, children, ...props }) => (
  <MenuItem>
    <button className="button-menu-item" {...props}>
      <div className="button-menu-item__name">{name}</div>
      <div className="button-menu-item__description">{children}</div>
    </button>
  </MenuItem>
);

export default ButtonMenuItem;
