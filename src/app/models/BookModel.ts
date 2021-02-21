export interface IBook {
  name: string;
  description: string;
  price: number;
  category: BookCategory;
  createDate: Date;
  isAvailable: boolean;
}

enum BookCategory {
  Adventure,
  Art,
  Children,
  Cooking,
  Comics,
  Contemporary,
  Development,
  Dystopian,
  Health,
  History,
  Horror,
  Humor,
  Fantasy,
  Motivational,
  Mystery,
  Travel,
  Thriller,
  Romance,
  Paranormal,
  Westerns,
}
