/* eslint-disable @typescript-eslint/ban-types */
import { getFromHahow } from '../../service/HahowService';
import axios, { AxiosStatic } from 'axios';

type AxiosMock = {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
} & AxiosStatic;

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
});

describe('HahowService', () => {
  describe('getFromHahow', () => {
    const data = { code: 10000, message: 'backend error' };
    const mockAxios = axios as AxiosMock;
    test('it should throw error', async () => {
      mockAxios.mockResolvedValue({ data });
      try {
        await getFromHahow({ url: 'http://test' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
