import type React from 'react';
import type { IconProps } from '@tabler/icons-react';

type IconComponent = React.ComponentType<IconProps>;

export type NavigationType = {
  i18nKey: string;
  url: string;
  icon: IconComponent;
  activeIcon: IconComponent;
};
