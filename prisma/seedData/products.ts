import { Prisma, Product } from '@prisma/client';

export const seedProducts: Prisma.ProductCreateManyInput[] = [
  {
    id: 1,
    images: [
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901518/ogani/image/products/meat_upuhll.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901518/ogani/image/products/meat1_q284vx.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901520/ogani/image/products/meat2_kgnkky.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901518/ogani/image/products/meat3_kwjxve.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901519/ogani/image/products/meat4_cj1xca.jpg',
    ],
    name: 'Pork',
  },
  {
    id: 2,
    images: [
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901493/ogani/image/products/banana_gblcxl.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901493/ogani/image/products/banana2_bbe4c6.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901498/ogani/image/products/banana3_gy8dy0.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901493/ogani/image/products/banana4_jjlp2u.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901493/ogani/image/products/banana5_snlfxa.jpg',
    ],
    name: 'Banana',
  },
  {
    id: 3,
    images: [
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901503/ogani/image/products/guava_oprnul.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901504/ogani/image/products/guava1_hgm6tz.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901503/ogani/image/products/guava2_inuiey.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901504/ogani/image/products/guava3_pbnxvh.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901506/ogani/image/products/guava4_fsxrbf.jpg',
    ],
    name: 'Guava',
  },
  {
    id: 4,
    images: [
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901523/ogani/image/products/watermelon_zuvgng.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901524/ogani/image/products/watermelon1_llhgmj.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901525/ogani/image/products/watermelon2_s2m1oo.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901528/ogani/image/products/watermelon_3_jz5pfp.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901531/ogani/image/products/watermelon4_jndruu.jpg',
    ],
    name: 'Watermelon',
  },
  {
    id: 5,
    images: [
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901499/ogani/image/products/grape_jjx5vl.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901499/ogani/image/products/grape1_kkfaxa.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901499/ogani/image/products/grape2_k3tqg7.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901500/ogani/image/products/grape3_hcnw1i.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901500/ogani/image/products/grape4_dkpl2i.jpg',
    ],
    name: 'Grape',
  },
  {
    id: 6,
    images: [
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901507/ogani/image/products/hamburger_is5yby.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901507/ogani/image/products/hamburger1_vri6mg.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901508/ogani/image/products/hamburger2_xogk8v.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901508/ogani/image/products/hamburger3_rfore9.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901507/ogani/image/products/hamburger4_qyvtfh.jpg',
    ],
    name: 'Hamburger',
  },
  {
    id: 7,
    images: [
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901511/ogani/image/products/mango_u6gsi8.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901511/ogani/image/products/mango1_nd0aqd.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901511/ogani/image/products/mango2_sh6ggx.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901511/ogani/image/products/mango3_tvoifx.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901511/ogani/image/products/mango4_i6ayyb.jpg',
    ],
    name: 'Mango',
  },
  {
    id: 8,
    images: [
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901485/ogani/image/products/apple_wptbpf.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901486/ogani/image/products/apple2_eodyc2.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901486/ogani/image/products/apple3_gwchjn.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901485/ogani/image/products/apple4_cb42qq.jpg',
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676901485/ogani/image/products/apple5_tkjkmx.jpg',
    ],
    name: 'Apple',
  },
];
