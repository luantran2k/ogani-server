export const seedCategogriese: { id: number; name: string; image: string }[] = [
  {
    id: 1,
    name: 'Meat',
    image:
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676877239/ogani/image/productCategories/meat_gdhqoa.png',
  },
  {
    id: 2,
    name: 'Vegetables',
    image:
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676877244/ogani/image/productCategories/vegetable_yax4so.png',
  },
  {
    id: 3,
    name: 'Fruits',
    image:
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676877239/ogani/image/productCategories/fruit_yrbcic.png',
  },
  {
    id: 4,
    name: 'Egg',
    image:
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676877239/ogani/image/productCategories/egg_lsu5sx.png',
  },
  {
    id: 5,
    name: 'Juice',
    image:
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676877239/ogani/image/productCategories/juice_inufsv.png',
  },
  {
    id: 6,
    name: 'Milk',
    image:
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676877238/ogani/image/productCategories/milk_c0qtvg.png',
  },
  {
    id: 7,
    name: 'Fastfood',
    image:
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676877240/ogani/image/productCategories/fast-food_lahset.png',
  },
  {
    id: 8,
    name: 'Other',
    image:
      'https://res.cloudinary.com/dm3xuympe/image/upload/v1676877530/ogani/image/productCategories/other_galoft.png',
  },
];

// interface User {
//   name: string;
//   age: number;
// }

// const user: User = {
//   name: 'John',
//   age: 3,
// };
// type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
// type MyPropType = PropType<User, 'age' | 'name'>;
// function assgingValue<TObj, TProp extends keyof TObj>(
//   obj: TObj,
//   field: TProp,
//   value: TObj[TProp],
// ) {
//   obj[field] = value; //Type 'string' is not assignable to type 'never'.
// }

// function assign<Field extends keyof User>(
//   obj: User,
//   field: Field,
//   value: User[Field],
// ) {
//   obj[field] = value;
// }

// assign(user, 'name', 'das');
