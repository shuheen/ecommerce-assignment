import {atom} from 'recoil';
import {CartItem} from '../types/cart';

import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

export const cartAtom = atom<CartItem[]>({
  key: 'cartAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
