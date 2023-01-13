import { HeroService } from '../../service/HeroService';
import { getFromHahow } from '../../service/HahowService';
import { Hero, AuthHero } from '../../interface/Hero';
import { Profile, ProfileWithHeroId } from '../../interface/Profile';
jest.mock('../../service/HahowService');

afterEach(() => {
  jest.resetAllMocks();
});

describe('HeroService', () => {
  describe('getAuthHeroByHeroId', () => {
    const fakeHero: Hero = {
      id: '1',
      name: 'faker',
      image: 'https://google.com',
    };
    const fakeProfile: Profile = {
      str: 1,
      int: 2,
      agi: 3,
      luk: 4,
    };
    const mockHahow = getFromHahow as jest.Mock;
    test('it should return hero data with profile', async () => {
      mockHahow.mockResolvedValueOnce('OK').mockResolvedValueOnce(fakeHero).mockResolvedValueOnce(fakeProfile);
      const service = new HeroService();
      const authHero = await service.getAuthHeroByHeroId('hahow', 'rocks', 1);
      expect(mockHahow).toHaveBeenCalledTimes(3);
      expect(authHero).toEqual({ ...fakeHero, profile: fakeProfile });
    }, 10000);
  });

  describe('getAuthHeroes', () => {
    const fakeHeroes: Hero[] = [
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
    const fakeProfiles: ProfileWithHeroId[] = [
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
    const fakeAuthHeroes: AuthHero[] = [
      {
        id: '1',
        name: 'faker',
        image: 'https://google.com',
        profile: {
          str: 1,
          int: 2,
          agi: 3,
          luk: 4,
        },
      },
      {
        id: '2',
        name: 'faker2',
        image: 'https://google.com',
        profile: {
          str: 11,
          int: 22,
          agi: 33,
          luk: 44,
        },
      },
    ];
    const mockHahow = getFromHahow as jest.Mock;
    test('it should return heroes data with profile', async () => {
      mockHahow
        .mockResolvedValueOnce('OK')
        .mockResolvedValueOnce(fakeHeroes)
        .mockResolvedValueOnce(fakeProfiles[0])
        .mockResolvedValueOnce(fakeProfiles[1]);
      const service = new HeroService();
      const authHeroes = await service.getAuthHeroes('hahow', 'rocks');
      expect(mockHahow).toHaveBeenCalledTimes(4);
      expect(authHeroes.length).toBe(2);
      expect(authHeroes[0]).toEqual(fakeAuthHeroes[0]);
      expect(authHeroes[1]).toEqual(fakeAuthHeroes[1]);
    }, 10000);
  });

  describe('getProfileByHeroId', () => {
    const fakeProfile: Profile = {
      str: 1,
      int: 2,
      agi: 3,
      luk: 4,
    };
    const mockHahow = getFromHahow as jest.Mock;
    test('it should return profile', async () => {
      mockHahow.mockResolvedValue(fakeProfile);
      const service = new HeroService();
      const profile = await service['getProfileByHeroId'](1);
      expect(mockHahow).toHaveBeenCalledTimes(1);
      expect(profile).toMatchObject<Profile>;
    }, 10000);

    test('it should return profile with hero id', async () => {
      mockHahow.mockResolvedValue(fakeProfile);
      const service = new HeroService();
      const profile = await service['getProfileByHeroId'](1, true);
      expect(mockHahow).toHaveBeenCalledTimes(1);
      expect(profile).toMatchObject<ProfileWithHeroId>;
    }, 10000);
  });
});
