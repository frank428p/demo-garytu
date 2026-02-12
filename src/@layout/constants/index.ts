import { RouterUrl } from '@/@core/constants/routerUrl';
import { NavigationType } from '@/@layout/types/index';

import {
  IconBuildingStore,
  IconFolder,
  IconFolderFilled,
  IconSparkles,
  IconBuilding,
} from '@tabler/icons-react';

export const StoreNav: NavigationType = {
  i18nKey: 'Store',
  url: RouterUrl.Store,
  icon: IconBuildingStore,
  activeIcon: IconBuildingStore,
};

export const AssetsNav: NavigationType = {
  i18nKey: 'Assets',
  url: RouterUrl.Assets,
  icon: IconFolder,
  activeIcon: IconFolderFilled,
};

export const GenerateNav: NavigationType = {
  i18nKey: 'Generate',
  url: RouterUrl.Generate,
  icon: IconSparkles,
  activeIcon: IconSparkles,
};

// export const EnterpriseNav: NavigationType = {
//   i18nKey: 'Enterprise',
//   url: RouterUrl.Enterprise,
//   icon: IconBuilding,
//   activeIcon: IconBuilding,
// };
