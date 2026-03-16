import { RouterUrl } from '@/@core/constants/routerUrl';
import { NavigationType } from '@/@layout/types/index';

import {
  IconCompass,
  IconCompassFilled,
  IconBuildingStore,
  IconFolder,
  IconFolderFilled,
  IconSparkles,
  IconPhoto,
  IconPhotoFilled,
  IconVideo,
  IconVideoFilled,
} from '@tabler/icons-react';

export const ExploreNav: NavigationType = {
  i18nKey: 'Explore',
  url: RouterUrl.Explore,
  icon: IconCompass,
  activeIcon: IconCompassFilled,
};

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

export const ImageGenerateNav: NavigationType = {
  i18nKey: 'Image',
  url: RouterUrl.ImageGenerate,
  icon: IconPhoto,
  activeIcon: IconPhotoFilled,
};

export const VideoGenerateNav: NavigationType = {
  i18nKey: 'Video',
  url: RouterUrl.VideoGenerate,
  icon: IconVideo,
  activeIcon: IconVideoFilled,
};

// export const EnterpriseNav: NavigationType = {
//   i18nKey: 'Enterprise',
//   url: RouterUrl.Enterprise,
//   icon: IconBuilding,
//   activeIcon: IconBuilding,
// };
