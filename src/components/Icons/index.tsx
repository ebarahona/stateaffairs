import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const icons = {
  close: `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M6 6L12 12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path fill="currentColor" d="M6 12L12 6" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
  home: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79z"/>
    </svg>
  `,
  list: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19 8H5v2h14zm0 6H5v2h14z"/>
    </svg>
  `,
  add: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M13 11h9v2h-9v9h-2v-9H2v-2h9V2h2z"/>
    </svg>
  `,
};

interface IconProps {
  color?: string;
  size?: string;
}

const createIcon =
  (name: keyof typeof icons) =>
  ({ color = 'white', size = '100%' }: IconProps) =>
    <SvgXml xml={icons[name]} width={size} height={size} color={color} />;

export const AddIcon = createIcon('add');
export const ListIcon = createIcon('list');
export const HomeIcon = createIcon('home');
export const CloseIcon = createIcon('close');

export const AppIcon = ({
  name = 'close',
  color = 'white',
  size = '100%',
}: {
  name: keyof typeof icons;
  color?: string;
  size?: string;
}) => <SvgXml xml={icons[name]} width={size} height={size} color={color} />;
