import dataSource from "../../../data-source";
import { DataSource, Repository } from "typeorm";
import request from "supertest";
import app from "../../../app";
import Address from "../../../entities/addresses.entity";
import {
  mockedAddressRequest,
  mockedAddressResponse,
  mockedAdmin,
  mockedAdminLogin,
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
    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${tokenAdmin.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).not.toHaveProperty("user.password");
  });

  test("GET /addresses -  should not be able to list addresses without Admin", async () => {
    const response = await request(app).get("/addresses");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
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
      .delete(`/addresses/${address.body[1].id}`)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.status).toBe(204);
  });
});
