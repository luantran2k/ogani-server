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
    description: `Pork is the meat of pigs that are usually slaughtered between six months and one year of age1. It is one of the most popular and widely consumed meats in the world2. Pork can be cooked fresh or preserved by curing, smoking, or salting2. Some examples of pork products are ham, bacon, sausage, and lard1.

    Pork has a grayish pink color when raw and a light color when cooked. It has a firm and fine-grained texture with some fat marbling. Pork is rich in protein and contains various vitamins and minerals3.`,
    details: `Pork is divided into four main sections: shoulder, loin, belly, and leg1. Each section has different cuts that vary in tenderness, flavor, and cooking methods2.

    The shoulder is a tough but flavorful cut that is good for roasting, braising, or making pulled pork. Some common shoulder cuts are blade roast, picnic roast, and Boston butt2.
    
    The loin is a tender and lean cut that is good for frying, grilling, or baking. Some common loin cuts are loin chops (with a T-shaped bone), rib chops (with a curved bone), sirloin chops (with no bone), and tenderloin (a small filet mignon cut)23.
    
    The belly is a fatty and juicy cut that is good for curing, smoking, or roasting. Some common belly cuts are bacon (thinly sliced cured meat), pancetta (Italian-style bacon), spare ribs (meaty ribs with some cartilage), and baby back ribs (smaller ribs with more meat)2.
    
    The leg is a lean and muscular cut that is good for roasting or curing. Some common leg cuts are ham (cured whole leg), fresh ham (uncured whole leg), shank end (lower part of the leg), and butt end (upper part of the leg)2.`,
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
    description: `A banana is a yellow fruit that grows on large plants in tropical regions. It has a soft and sweet flesh inside a peel that can be easily removed. Bananas are rich in potassium, fiber, and vitamin C. They can be eaten raw as a snack or dessert, or cooked in various dishes12.`,
    details: `Bananas belong to the genus Musa and have hundreds of varieties that differ in size, shape, color, flavor, and usage1. Bananas can be broadly classified into two groups: dessert bananas and plantains1.

    Dessert bananas are sweet and soft when ripe and are usually eaten raw. Some examples of dessert bananas are Cavendish (the most common type), baby (also called Lady’s Finger), red (with a pinkish peel), Manzano (with a slight apple flavor), and Pisang Raja (with a custard-like texture)123.
    
    Plantains are starchy and firm when ripe and are usually cooked as a vegetable. They are popular in many tropical cuisines and can be fried, boiled, baked, or mashed. Some examples of plantains are green (the most common type), yellow (slightly sweeter than green), black (very ripe and sweet), horn (very large and curved), and French (smaller than horn)12.`,
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
    description: `A guava is a round or oval fruit with a yellow or green skin and a pink or white flesh. It has many small edible seeds and a sweet and sour flavor. Guava grows on a small tree that belongs to the myrtle family and is native to tropical and subtropical regions12. Guava is rich in vitamin C, fiber, antioxidants, and other nutrients3. It can be eaten raw, cooked, juiced, or made into jams, jellies, and pastries24.`,
    details: `Guava has hundreds of varieties that differ in size, shape, color, flavor, and seediness12. Guava can be broadly classified into two groups: red-pink guava and white guava2.

    Red-pink guava has a red or pink flesh and a strong aroma. It is usually sweeter and juicier than white guava. Some examples of red-pink guava are Red Malaysian (with red-tinted leaves and flowers), Ruby X (a hybrid of two Florida varieties), Beaumont (commercially planted in Hawaii), and Red Indian (native to Florida)12.
    
    White guava has a white or cream flesh and a mild flavor. It is usually firmer and less seedy than red-pink guava. Some examples of white guava are Tropical White (with large fruits), Indonesian White (with smooth skin), Mexican Cream (with yellow skin), and Lemon Guava (with lemon-like flavor)12.`,
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
    description: `A watermelon is a type of fruit that grows on a vine-like plant. It has a hard green rind and a juicy red flesh with black seeds1. Watermelon is low in calories and rich in vitamin C, potassium and antioxidants23. It is a popular summer snack that can help you stay hydrated and healthy.😊`,
    details: `Watermelon belongs to the Cucurbitaceae family, which includes cucumbers, pumpkins and squash1. It originated in Africa and was cultivated by ancient Egyptians1. There are more than 1,000 varieties of watermelon, ranging in size, shape, color and sweetness1. Some of the most common types are seedless, picnic, icebox and yellow/orange fleshed1.

    Watermelon has many health benefits. It can help lower blood pressure, reduce inflammation, prevent muscle soreness and improve skin health23. It also contains lycopene, a powerful antioxidant that can protect against some types of cancer23. Watermelon is mostly water (about 92%), so it can help you stay hydrated and feel full23.
    
    Watermelon can be enjoyed raw or cooked. You can slice it, cube it, juice it or blend it into smoothies. You can also make salads, salsas, soups or desserts with watermelon. Some popular dishes with watermelon are watermelon feta salad, watermelon gazpacho and watermelon sorbet1.`,
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
    description: ``,
    details: ``,
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
    description: ``,
    details: ``,
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
    description: ``,
    details: ``,
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
    description: ``,
    details: ``,
  },
];
