export type Profile = {
  str: number;
  int: number;
  agi: number;
  luk: number;
};

export type ProfileWithHeroId = {
  hero_id: string;
} & Profile;
