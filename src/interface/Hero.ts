import { Profile } from './Profile';

export type Hero = {
  id: string;
  name: string;
  image: string;
};

export type AuthHero = {
  profile: Profile;
} & Hero;
