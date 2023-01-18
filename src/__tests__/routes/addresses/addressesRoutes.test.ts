import dataSource from "../../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import Address from "../../../entities/addresses.entity";
import {
  mockedAddressRequest,
  mockedAddressResponse,
  mockedAdmin,
  mockedAdminLogin,
  mockedUpdateAddress,
  mockedUser,
  mockedUser2,
  mockedUserLogin,
  mockedUserLogin2,
} from "../../mocks";

describe("/addresses", () => {
  let dbConnection: DataSource;
  const baseUrl: string = "/addresses";

  beforeAll(async () => {
    await dataSource
      .initialize()
      .then((res) => (dbConnection = res))
      .catch((err) => console.error(err));

    await request(app).post("/users").send(mockedAdmin);
  });

  beforeEach(async () => {
    const addressRepository = dataSource.getRepository(Address);
    const addresses = await addressRepository.find();
    await addressRepository.remove(addresses);
  });

  afterAll(async () => {
    await dbConnection.destroy();
  });

  test("POST /addresses - Must be able to create a address for user", async () => {
    await request(app).post("/users").send(mockedUser);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedAddressRequest);

    const expectedResults = {
      status: 201,
      bodyToEqual: mockedAddressResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectedResults.bodyToEqual)
    );
    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
    expect(response.body).not.toEqual(
      expect.objectContaining({ user: expect.any(Object) })
    );
  });

  test("POST /addresses-  should not be able to create a address that already exists", async () => {
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedAddressRequest);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedAddressRequest);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /addresses -  Must be able to list all addresses by Admin", async () => {
    const tokenAdmin = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenAdmin.body.token}`)
      .send(mockedAddressRequest);
    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${tokenAdmin.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).not.toHaveProperty("user.password");
  });

  test("GET /addresses -  should not be able to list addresses without Admin", async () => {
    const response = await request(app).get(baseUrl);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /addresses/:id -  Must be able to list own address", async () => {
    const user = await request(app).post("/users").send(mockedUser2);

    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedAddressRequest);

    const response = await request(app)
      .get(`${baseUrl}/${user.body.id}`)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.body).toEqual(
      expect.objectContaining(mockedAddressResponse)
    );
  });

  test("GET /addresses/:id -  should not be able to list addresses with invalid id", async () => {
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedAddressRequest);

    const response = await request(app)
      .get(`${baseUrl}/15205722-47bd-4107-8cd4-680229f00098`)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  test("PATCH /addresses/:id - Must be able to update own address", async () => {
    await request(app).post("/users").send(mockedUser2);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    const createAddress = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedAddressRequest);

    const response = await request(app)
      .patch(`${baseUrl}/${createAddress.body.id}`)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedUpdateAddress);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
  });

  test("PATCH /addresses/:id - Must be able to update own address", async () => {
    await request(app).post("/users").send(mockedUser2);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    const createAddress = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedAddressRequest);

    const response = await request(app)
      .patch(`${baseUrl}/${createAddress.body.id}`)
      .send(mockedUpdateAddress);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /addresses/:id -  Logged user must be able to delete own address", async () => {
    await request(app).post("/users").send(mockedUser2);

    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    const tokenAdmin = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedAddressRequest);

    const address = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${tokenAdmin.body.token}`);

    const response = await request(app)
      .delete(`/addresses/${address.body[0].id}`)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /addresses/:id -  Not to be able delete address of another user ", async () => {
    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedUser2);

    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const tokenUser2 = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    const tokenAdmin = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedAddressRequest);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser2.body.token}`)
      .send(mockedAddressRequest);

    const address = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${tokenAdmin.body.token}`);

    const response = await request(app)
      .delete(`/addresses/${address.body[0].id}`)
      .set("Authorization", `Bearer ${tokenUser2.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
