import type { HttpPort } from '@ports/HttpPort';

export class ApiUseCase {
  constructor(private httpClient: HttpPort) {}

  async fetchData<T>(endpoint: string): Promise<T> {
    const response = await this.httpClient.get<T>(endpoint);
    return response.data;
  }

  async sendData<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await this.httpClient.post<T>(endpoint, data);
    return response.data;
  }

  async updateData<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await this.httpClient.put<T>(endpoint, data);
    return response.data;
  }

  async removeData<T>(endpoint: string): Promise<T> {
    const response = await this.httpClient.delete<T>(endpoint);
    return response.data;
  }
}
