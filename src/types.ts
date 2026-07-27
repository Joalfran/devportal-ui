import type { ReactNode } from 'react';

export type ActiveView = 'foundations' | 'components' | 'templates' | 'sandbox';

export interface SandboxEntry {
  id: string;
  label: string;
  description: string;
  render: () => ReactNode;
}

export interface ColorToken {
  name: string;
  tokenName: string;
  hex: string;
  containerLabel?: string;
  containerHex?: string;
  textColor?: string;
}

export interface TypoToken {
  tokenName: string;
  exampleText: string;
  sizeWeight: string;
  className: string;
}

export interface SpacingToken {
  name: string;
  pixel: string;
  sizeClass: string;
}

export interface ProductTemplate {
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  image: string;
}

export interface UserProfileTemplate {
  name: string;
  role: string;
  tags: string[];
  imageUrl: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
