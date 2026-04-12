import bodyPoster from '../assets/service-posters/body.png';

import facialPoster from '../assets/service-posters/faical.png';
import hairColorPoster from '../assets/service-posters/women.png';
import hairCutPoster from '../assets/service-posters/3.png';

import makeupPoster from '../assets/service-posters/1.png';
import menGroomingPoster from '../assets/service-posters/men.png';
import nailPoster from '../assets/service-posters/nailartt.png';
import texturePoster from '../assets/service-posters/2.png';

const DEFAULT_SERVICE_POSTER = '/assets/service-posters/1.png';
const defaultPoster = DEFAULT_SERVICE_POSTER;
const hairRitualPoster = texturePoster;
const threadingPoster = facialPoster;
const waxPoster = bodyPoster;


export const serviceImageLibrary = {
  body: bodyPoster,
  default: defaultPoster,
  facial: facialPoster,
  hairColor: hairColorPoster,
  hairCut: hairCutPoster,
  hairRitual: hairRitualPoster,
  makeup: makeupPoster,
  menGrooming: menGroomingPoster,
  nail: nailPoster,
  texture: texturePoster,
  threading: threadingPoster,
  wax: waxPoster,
};

const includesAny = (source, keywords) => keywords.some((keyword) => source.includes(keyword));

export const resolveServiceImage = (service = {}) => {
  const explicitImage = service.imageUrl || service.image;

  if (typeof explicitImage === 'string' && explicitImage.trim()) {
    return explicitImage;
  }

  const name = `${service.name || ''} ${service.category || ''} ${service.gender || ''}`.toLowerCase();

  if (includesAny(name, ['beard', 'shave', 'groom', 'clipper', 'mustache'])) {
    return serviceImageLibrary.menGrooming;
  }

  if (includesAny(name, ['highlight', 'colour', 'color', 'global', 'fashion', 'root touch'])) {
    return serviceImageLibrary.hairColor;
  }

  if (includesAny(name, ['keratin', 'smooth', 'rebond', 'botox', 'cysteine', 'straight', 'texture'])) {
    return serviceImageLibrary.texture;
  }

  if (includesAny(name, ['spa', 'ritual', 'repair', 'protein', 'nourish', 'therapy'])) {
    return serviceImageLibrary.hairRitual;
  }

  if (includesAny(name, ['facial', 'cleanup', 'clean up', 'glow', 'bleach', 'd-tan', 'detan', 'skin'])) {
    return serviceImageLibrary.facial;
  }

  if (includesAny(name, ['thread', 'brow', 'eyebrow', 'upper lip', 'forehead', 'chin'])) {
    return serviceImageLibrary.threading;
  }

  if (includesAny(name, ['wax', 'rica'])) {
    return serviceImageLibrary.wax;
  }

  if (includesAny(name, ['body', 'polish', 'massage'])) {
    return serviceImageLibrary.body;
  }

  if (includesAny(name, ['makeup', 'bridal', 'engagement', 'party look', 'reception'])) {
    return serviceImageLibrary.makeup;
  }

  if (includesAny(name, ['nail', 'manicure', 'pedicure'])) {
    return serviceImageLibrary.nail;
  }

  if (includesAny(name, ['cut', 'trim', 'style', 'blow dry', 'blowdry', 'hair wash', 'wash'])) {
    return serviceImageLibrary.hairCut;
  }

  if (includesAny(name, ['hair'])) {
    return serviceImageLibrary.hairCut;
  }

  return serviceImageLibrary.default;
};
