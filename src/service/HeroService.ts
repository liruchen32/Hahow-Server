import axios from 'axios';
import { Hero, AuthHero } from '../interface/Hero';
import { Profile } from '../interface/Profile';

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

  public async auth(name: string, password: string) {
    const response = await axios({
      method: 'post',
      url: 'https://hahow-recruit.herokuapp.com/auth',
      data: {
        name,
        password,
      },
    });
    return response;
  }

  public async getAuthHero(name: string, password: string, id: number): Promise<AuthHero> {
    await this.auth(name, password);
    const hero = await this.get(id);
    const profile = await this.getProfile(id);
    return { ...hero, profile };
  }

  public async getAuthHeros(name: string, password: string): Promise<AuthHero[]> {
    await this.auth(name, password);
    const heros = await this.getAll();

    const result = [];
    for (const hero of heros) {
      const { id } = hero;
      const profile = await this.getProfile(Number(id));
      result.push({ ...hero, profile });
    }

    return result;
  }
}
