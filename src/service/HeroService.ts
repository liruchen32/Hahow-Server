import { Hero } from '../interface/Hero';
import { Profile } from '../interface/Profile';
import axios from 'axios';

export class HeroService {
  public async get(id: number): Promise<Hero> {
    const { data }: { data: Hero } = await axios(`https://hahow-recruit.herokuapp.com/heroes/${id}`);
    return data;
  }

  public async getAll(): Promise<Hero[]> {
    const { data }: { data: Hero[] } = await axios('https://hahow-recruit.herokuapp.com/heroes');
    return data;
  }

  public async getProfile(id: number): Promise<Profile> {
    const { data }: { data: Profile } = await axios(`https://hahow-recruit.herokuapp.com/heroes/${id}/profile`);
    return data;
  }
}
