import AppDataSource from "../../../data-source";
import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedCategory,
  mockedProduct1,
  mockedProductToRequest1,
  mockedUpdateProductToRequest,
  mockedUser,
  mockedUserLogin,
} from "../../mocks";
import Request from "../../../entities/request.entity";

describe("/products_requests", () => {
  let connection: DataSource;
  const baseUrl: string = "/requests";
  const requestRepository = AppDataSource.getRepository(Request);
  const fakeUUID = "7301ebd2-71fa-4b48-8539-757dcff811f7";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log(err);
      });

    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
    const adminToken = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);
    const category = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminToken.body.token}`)
      .send(mockedCategory);
    mockedProduct1.categoryId = category.body.id;
    const product1 = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${adminToken.body.token}`)
      .send(mockedProduct1);
    mockedProductToRequest1.productId = product1.body.id;
  });

  beforeEach(async () => {
    const requests = await requestRepository.find();
    await requestRepository.remove(requests);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /requests/:id/products - Should be able to register a product in user request", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const response = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("productName");
  });

  it("POST /requests/:id/products - Should not be able to register a product in a request that not exists", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post(`${baseUrl}/${fakeUUID}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /requests/:id/products - Should not be able to register a product that already exists in request", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /requests/:id/products - Should not be able to register a product in a request from another user", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const adminToken = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);

    const adminRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    const response = await request(app)
      .post(`${baseUrl}/${adminRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /requests/:id/products - Should not be able to register a product in a request that is already finished", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    await request(app)
      .patch(`${baseUrl}/${userRequest.body.id}`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send({ status: "finalizado" });

    const response = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /requests/:id/products - Should not be able to register a product that not exists in a request", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const response = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send({ productId: fakeUUID, quantity: 2 });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /requests/:id/products - Should not be able to register a product that does not have enough stock", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const response = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send({ productId: mockedProductToRequest1.productId, quantity: 100 });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("GET /requests/:id/products - Should be able to list products of a request", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .get(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("totalQuantity");
    expect(response.body).toHaveProperty("totalValue");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("productTorequest");
  });

  it("GET /requests/:id/products - Should not be able to list products of a request from another user", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const adminToken = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);

    const adminRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${adminRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .get(`${baseUrl}/${adminRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("GET /requests/:id/products - Should not be able to list products of a request that not exists", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get(`${baseUrl}/${fakeUUID}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /requests/:id/products/:productId - Should be able to update a product in user request", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .patch(
        `${baseUrl}/${userRequest.body.id}/products/${mockedProductToRequest1.productId}`
      )
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedUpdateProductToRequest);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("productName");
  });

  it("PATCH /requests/:id/products/:productId - Should not be able to update a product in a request from another user", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const adminToken = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);

    const adminRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${adminRequest.body.id}/products`)
      .set("Authorization", `Bearer ${adminToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .patch(
        `${baseUrl}/${adminRequest.body.id}/products/${mockedProductToRequest1.productId}`
      )
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedUpdateProductToRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /requests/:id/products/:productId - Should be not be able to update a product in a request that is already finished", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    await request(app)
      .patch(`${baseUrl}/${userRequest.body.id}`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send({ status: "finalizado" });

    const response = await request(app)
      .patch(
        `${baseUrl}/${userRequest.body.id}/products/${mockedProductToRequest1.productId}`
      )
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedUpdateProductToRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /requests/:id/products/:productId - Should not be able to update a product that is not in the request", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .patch(`${baseUrl}/${userRequest.body.id}/products/${fakeUUID}`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedUpdateProductToRequest);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /requests/:id/products/:productId - Should not be able to update a product that does not have enough stock", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .patch(
        `${baseUrl}/${userRequest.body.id}/products/${mockedProductToRequest1.productId}`
      )
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send({ quantity: 500 });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /requests/:id/products/:productId - Should be able to delete a product in user request", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .delete(
        `${baseUrl}/${userRequest.body.id}/products/${mockedProductToRequest1.productId}`
      )
      .set("Authorization", `Bearer ${userToken.body.token}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("DELETE /requests/:id/products/:productId - Should not be able to delete a product in a request from another user", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const adminToken = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);

    const adminRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${adminRequest.body.id}/products`)
      .set("Authorization", `Bearer ${adminToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .delete(
        `${baseUrl}/${adminRequest.body.id}/products/${mockedProductToRequest1.productId}`
      )
      .set("Authorization", `Bearer ${userToken.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /requests/:id/products/:productId - Should be not be able to delete a product in a request that is already finished", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    await request(app)
      .patch(`${baseUrl}/${userRequest.body.id}`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send({ status: "finalizado" });

    const response = await request(app)
      .delete(
        `${baseUrl}/${userRequest.body.id}/products/${mockedProductToRequest1.productId}`
      )
      .set("Authorization", `Bearer ${userToken.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /requests/:id/products/:productId - Should not be able to delete a product that is not in the request", async () => {
    const userToken = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const userRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    const registerProduct = await request(app)
      .post(`${baseUrl}/${userRequest.body.id}/products`)
      .set("Authorization", `Bearer ${userToken.body.token}`)
      .send(mockedProductToRequest1);

    const response = await request(app)
      .delete(`${baseUrl}/${userRequest.body.id}/products/${fakeUUID}`)
      .set("Authorization", `Bearer ${userToken.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
