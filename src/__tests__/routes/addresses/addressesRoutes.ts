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
  mockedUserLogin,
} from "../../mocks";

describe("/addresses", () => {
  let dbConnection: DataSource;
  const baseUrl: string = "/addresses";
  const addressRepo: Repository<Address> = dataSource.getRepository(Address);

  beforeAll(async () => {
    await dataSource
      .initialize()
      .then((res) => (dbConnection = res))
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await dbConnection.destroy();
  });

  it("POST /addresses - Must be able to create a address for admin", async () => {
    await request(app).post("/users").send(mockedAdmin);
    const tokenAdmin = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenAdmin.body.token}`)
      .send(mockedAddressRequest);

    const expectedResults = {
      status: 201,
      bodyToEqual: mockedAddressResponse,
    };

    console.log(tokenAdmin.body.token);

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

  it("POST /addresses - Must be able to create a address for admin", async () => {
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

    console.log(tokenUser.body.token);

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
});
