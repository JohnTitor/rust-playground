import React from 'react';

interface HeaderProps {
  label: string;
}

const Header: React.FC<HeaderProps> = ({ label }) => (
  <span className="output-header">{label}</span>
);

export default Header;
