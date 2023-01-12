import axios from 'axios';
import { Hero, AuthHero } from '../interface/Hero';
import { Profile, ProfileWithHeroId } from '../interface/Profile';

const baseUrl = 'https://hahow-recruit.herokuapp.com';

export class HeroService {
  public async getById(id: number): Promise<Hero> {
    const { data } = await axios(`${baseUrl}/heroes/${id}`);
    if (data.code) {
      throw new Error(data.message);
    }
    return data;
  }

  public async getAll(): Promise<Hero[]> {
    const { data } = await axios(`${baseUrl}/heroes`);
    if (data.code) {
      throw new Error(data.message);
    }
    return data;
  }

  private async getProfileByHeroId(hero_id: number, return_with_hero_id = false): Promise<Profile | ProfileWithHeroId> {
    const { data } = await axios(`${baseUrl}/heroes/${hero_id}/profile`);
    if (data.code) {
      throw new Error(data.message);
    }
    return return_with_hero_id ? { hero_id: String(hero_id), ...data } : data;
  }

  private async auth(name: string, password: string) {
    const { data } = await axios({
      method: 'post',
      url: `${baseUrl}/auth`,
      data: {
        name,
        password,
      },
    });

    if (data.code) {
      throw new Error(data.message);
    }
  }

  public async getAuthHeroByHeroId(name: string, password: string, id: number): Promise<AuthHero> {
    await this.auth(name, password);
    const hero = await this.getById(id);
    const profile = await this.getProfileByHeroId(id);
    return { ...hero, profile };
  }

  public async getAuthHeroes(name: string, password: string): Promise<AuthHero[]> {
    await this.auth(name, password);
    const heroes = await this.getAll();

    const authHeroesMap = new Map();
    const profileRequests = [];
    for (const hero of heroes) {
      const { id } = hero;
      const profileRequest = this.getProfileByHeroId(Number(id), true);
      profileRequests.push(profileRequest);
      authHeroesMap.set(id, hero);
    }

    // using promise all to run each request
    const profiles = await Promise.all(profileRequests);

    for (const profile of profiles) {
      // Typescript think this could be Profile or ProfileWithHeroId, have to make it as ProfileWithHeroId
      const { hero_id, ...profileDetail } = profile as ProfileWithHeroId;
      authHeroesMap.set(hero_id, { ...authHeroesMap.get(hero_id), profile: profileDetail });
    }

    return Array.from(authHeroesMap.values());
  }
}
