import { createContext, useContext, useEffect, useState } from 'react';
import { IconDictionary } from '../types/icon.types';

interface IconDictionaryContextType {
  [key: string]: string;
}

export const IconDictionaryContext = createContext<IconDictionaryContextType>({});

interface Props {
  children: React.ReactNode;
  customDictionary?: IconDictionary;
}

export const IconDictionaryProvider: React.FC<Props> = ({ children, customDictionary }: Props) => {
  const [dictionary, setDictionary] = useState<IconDictionaryContextType>({});

  useEffect(() => {
    // Load default DYN UI icons + custom dictionary
    const defaultIcons: IconDictionary = {
      'user': 'dyn-icon-user',
      'home': 'dyn-icon-home',
      'settings': 'dyn-icon-settings',
      'ok': 'dyn-icon-ok',
      'close': 'dyn-icon-close',
      'warning': 'dyn-icon-warning',
      'minus': 'dyn-icon-minus',
      'plus': 'dyn-icon-plus',
      'search': 'dyn-icon-search',
      'edit': 'dyn-icon-edit',
      'delete': 'dyn-icon-delete',
      'arrow-up': 'dyn-icon-arrow-up',
      'arrow-down': 'dyn-icon-arrow-down',
      'arrow-left': 'dyn-icon-arrow-left',
      'arrow-right': 'dyn-icon-arrow-right',
      'menu': 'dyn-icon-menu',
      'info': 'dyn-icon-info',
      'calendar': 'dyn-icon-calendar',
      'clock': 'dyn-icon-clock',
      'mail': 'dyn-icon-mail'
      // Add more default mappings as needed
    };

    setDictionary({
      ...defaultIcons,
      ...customDictionary
    });
  }, [customDictionary]);

  return (
    <IconDictionaryContext.Provider value={dictionary}>
      {children}
    </IconDictionaryContext.Provider>
  );
};
