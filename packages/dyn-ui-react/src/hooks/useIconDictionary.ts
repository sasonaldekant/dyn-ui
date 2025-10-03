import * as React from 'react';
import { IconDictionaryContext } from '../providers/IconDictionaryProvider';

export const useIconDictionary = () => {
  return React.useContext(IconDictionaryContext as unknown as React.Context<any>);
};
