import dataSource from "../../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import Request from "../../../entities/request.entity";
import {
  mockedAdmin,
  mockedUser,
  mockedUserLogin,
  mockedAdminLogin,
  mockedUser2,
  mockedUserLogin2,
  mockedUpdateRequest,
} from "../../mocks";

describe("/requests", () => {
  let dbConnection: DataSource;
  const baseUrl: string = "/requests";

  beforeAll(async () => {
    await dataSource
      .initialize()
      .then((res) => (dbConnection = res))
      .catch((err) => console.error(err));

    await request(app).post("/users").send(mockedAdmin);
  });

  beforeEach(async () => {
    const requestRepository = dataSource.getRepository(Request);
    const requests = await requestRepository.find();
    await requestRepository.remove(requests);
  });

  afterAll(async () => {
    await dbConnection.destroy();
  });

  test("POST /requests - Must be able to create a request for user", async () => {
    await request(app).post("/users").send(mockedUser);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ date: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ totalValue: expect.any(Number) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ totalQuantity: expect.any(Number) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ status: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ user: expect.any(Object) })
    );
  });

  test("POST /requests - Should not to be able to create a request already exists", async () => {
    await request(app).post("/users").send(mockedUser);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /requests - Must to be able to list all requests", async () => {
    await request(app).post("/users").send(mockedAdmin);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).not.toHaveProperty("user.password");
    expect(response.status).toBe(200);
  });

  test("GET /requests - Should not to be able to list requests by normal user", async () => {
    await request(app).post("/users").send(mockedUser);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /requests - Should not to be able to list requests without auth", async () => {
    const response = await request(app).get(baseUrl);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /requests/:id - Must be able to list own request", async () => {
    await request(app).post("/users").send(mockedUser2);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    const createRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    const response = await request(app)
      .get(`${baseUrl}/${createRequest.body.id}`)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ date: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ totalValue: expect.any(Number) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ totalQuantity: expect.any(Number) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ status: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ user: expect.any(Object) })
    );
  });

  test("GET /requests/:id - Should not be able to list own request without auth", async () => {
    await request(app).post("/users").send(mockedUser2);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    const createRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    const response = await request(app).get(
      `${baseUrl}/${createRequest.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /requests/:id - Must be able to update own request", async () => {
    await request(app).post("/users").send(mockedUser2);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    const createRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    const response = await request(app)
      .patch(`${baseUrl}/${createRequest.body.id}`)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedUpdateRequest);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ status: "finalizado" })
    );
  });

  test("PATCH /requests/:id - Should not be able to update own request without auth", async () => {
    await request(app).post("/users").send(mockedUser2);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    const createRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    const response = await request(app)
      .patch(`${baseUrl}/${createRequest.body.id}`)
      .send(mockedUpdateRequest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /requests/:id - Must to be able to delete own request", async () => {
    await request(app).post("/users").send(mockedUser2);
    const tokenUser = await request(app)
      .post("/users/login")
      .send(mockedUserLogin2);

    const createRequest = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    const response = await request(app)
      .delete(`${baseUrl}/${createRequest.body.id}`)
      .set("Authorization", `Bearer ${tokenUser.body.token}`);

    expect(response.status).toBe(204);
  });
});
