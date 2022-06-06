export class RestClient {
  private base = import.meta.env.REST_API_ENDPOINT;

  async get<ResponseType>(url: string): Promise<ResponseType> {
    const response = await fetch(`${this.base}/${url}`);
    return await response.json();
  }

  async post<ResponseType, DataType>(
    url: string,
    data: DataType
  ): Promise<ResponseType> {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async patch<ResponseType, DataType>(
    url: string,
    data: DataType
  ): Promise<ResponseType> {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  async delete(url: string): Promise<void> {
    await fetch(url, { method: "DELETE" });
  }
}
