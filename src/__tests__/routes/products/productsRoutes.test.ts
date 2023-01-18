import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedCategory,
  mockedProduct,
  mockedProductUpdate,
  mockedUser,
  mockedUserLogin,
} from "../../mocks";

describe("/products", () => {
  let conenection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        conenection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);
    const createdCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);
  });

  afterAll(async () => {
    await conenection.destroy();
  });

  test("POST /products - Must be able to create a product", async () => {
    const categories = await request(app).get("/categories");
    const adminLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);
    mockedProduct.categoryId = categories.body[0].id;
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedProduct);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("category");
    expect(response.status).toBe(201);
  });

  test("POST /products - should not able to create product that already exists", async () => {
    const categories = await request(app).get("/categories");
    const adminLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);
    mockedProduct.categoryId = categories.body[0].id;
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedProduct);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /products -  should not be able to create product not being admin", async () => {
    const categories = await request(app).get("/categories");
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);
    mockedProduct.categoryId = categories.body[0].id;
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedProduct);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /products -  should not be able to create product without authentication", async () => {
    const categories = await request(app).get("/categories");
    mockedProduct.categoryId = categories.body[0].id;
    const response = await request(app).post("/products").send(mockedProduct);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /products -  Must be able to list all products", async () => {
    const response = await request(app).get("/products");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /products/:id - should be able to list user with id", async () => {
    await request(app).post("/products").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);

    const userTobeList = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .get(`/products/${userTobeList.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
  });

  test("GET /products/:id - should not be able to list user with invalid id", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get(`/products/05a7c5ba-e0d4-48ec-a6a0-2e497fd3dc57`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /products/:id - Must be able to edit a product name", async () => {
    const tokenAdmin = await request(app)
      .post("/users/login")
      .send(mockedAdminLogin);
    const productToUpdade = await request(app).get("/products");
    const response = await request(app)
      .patch(`/products/${productToUpdade.body[0].id}`)
      .set("Authorization", `Bearer ${tokenAdmin.body.token}`)
      .send(mockedProductUpdate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("category");
    expect(response.status).toBe(200);
  });

  test("PATCH /products/:id - The user must not be able to edit the product without authentication.", async () => {
    const productToUpdade = await request(app).get("/categories");
    const response = await request(app)
      .patch(`/products/${productToUpdade.body[0].id}`)
      .send(mockedProductUpdate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /products/:id - should not be able to create product not being admin", async () => {
    const tokenUser = await request(app).post("/users/login").send(mockedUser);
    const productToUpdade = await request(app).get("/products");
    const response = await request(app)
      .patch(`/products/${productToUpdade.body[0].id}`)
      .set("Authorization", `Bearer ${tokenUser.body.token}`)
      .send(mockedProductUpdate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /products/:id - The user must not be able to delete the product without authentication.", async () => {
    const productToUpdade = await request(app).get("/products");
    const response = await request(app).delete(
      `/products/${productToUpdade.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /products/:id -  Must not be able to delete product not being admin.", async () => {
    const tokenuser = await request(app).post("/users/login").send(mockedUser);
    const product = await request(app).get("/products");

    const response = await request(app)
      .delete(`/products/${product.body[0].id}`)
      .set("Authorization", `Bearer ${tokenuser.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /categories/:id -  User should not be able to delete non-existent product.", async () => {
    const tokenAdmin = await request(app)
      .post("/users/login")
      .send(mockedAdmin);

    const response = await request(app)
      .delete("/products/33f14b7d-e020-4ba0-a05c-d10588934ddf}")
      .set("Authorization", `Bearer ${tokenAdmin.body.token}`);

    expect(response.status).toBe(404);
  });
});
