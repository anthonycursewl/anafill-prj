import { HttpClient } from '@adapters/http/HttpClient';
import { ApiUseCase } from '@domain/usecases/ApiUseCase';
import type { HttpPort } from '@ports/HttpPort';

const apiClient: HttpPort = new HttpClient('https://api.example.com', {
  'Content-Type': 'application/json',
});

const apiUseCase = new ApiUseCase(apiClient);

export async function getUsers() {
  return apiUseCase.fetchData('/users');
}

export async function createUser(data: { name: string; email: string }) {
  return apiUseCase.sendData('/users', data);
}

export { apiClient, apiUseCase };
