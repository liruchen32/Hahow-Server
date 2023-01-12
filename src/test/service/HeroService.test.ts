import { HeroService } from '../../service/HeroService';
import { Hero } from '../../interface/Hero';
import { Profile } from '../../interface/Profile';

describe('HeroService', () => {
  describe('getAuthHeroByHeroId', () => {
    test('it should return hero data with profile', async () => {
      const fakeHero = {
        id: '1',
        name: 'faker',
        image: 'https://google.com',
      };
      const fakeProfile = {
        str: 1,
        int: 2,
        agi: 3,
        luk: 4,
      };
      const service = new HeroService();
      const spyAuth = jest.spyOn(service, 'auth');
      const spyGetById = jest.spyOn(service, 'getById').mockResolvedValue(fakeHero);
      const spyGetProfileByHeroId = jest.spyOn(service, 'getProfileByHeroId').mockResolvedValue(fakeProfile);
      const authHero = await service.getAuthHeroByHeroId('hahow', 'rocks', 1);
      expect(spyAuth).toHaveBeenCalledTimes(1);
      expect(spyGetById).toHaveBeenCalledTimes(1);
      expect(spyGetProfileByHeroId).toHaveBeenCalledTimes(1);
      expect(authHero).toEqual({ ...fakeHero, profile: fakeProfile });
      spyAuth.mockRestore();
      spyGetById.mockRestore();
      spyGetProfileByHeroId.mockRestore();
    }, 10000);
  });

  describe('getAuthHeros', () => {
    test('it should return heros data with profile', async () => {
      const fakeHeros: Hero[] = [
        {
          id: '1',
          name: 'faker',
          image: 'https://google.com',
        },
        {
          id: '2',
          name: 'faker2',
          image: 'https://google.com',
        },
      ];
      const fakeProfiles: Profile[] = [
        {
          hero_id: '1',
          str: 1,
          int: 2,
          agi: 3,
          luk: 4,
        },
        {
          hero_id: '2',
          str: 11,
          int: 22,
          agi: 33,
          luk: 44,
        },
      ];
      const service = new HeroService();
      const spyAuth = jest.spyOn(service, 'auth');
      const spyGetAll = jest.spyOn(service, 'getAll').mockResolvedValue(fakeHeros);
      const spyGetProfileByHeroId = jest
        .spyOn(service, 'getProfileByHeroId')
        .mockResolvedValueOnce(fakeProfiles[0])
        .mockResolvedValueOnce(fakeProfiles[1]);
      const authHeros = await service.getAuthHeros('hahow', 'rocks');
      expect(spyAuth).toHaveBeenCalledTimes(1);
      expect(spyGetAll).toHaveBeenCalledTimes(1);
      expect(spyGetProfileByHeroId).toHaveBeenCalledTimes(2);
      expect(authHeros.length).toBe(2);
      delete fakeProfiles[0].hero_id;
      delete fakeProfiles[1].hero_id;
      expect(authHeros[0]).toEqual({ ...fakeHeros[0], profile: fakeProfiles[0] });
      expect(authHeros[1]).toEqual({ ...fakeHeros[1], profile: fakeProfiles[1] });
      spyAuth.mockRestore();
      spyGetAll.mockRestore();
      spyGetProfileByHeroId.mockRestore();
    }, 10000);
  });
});
