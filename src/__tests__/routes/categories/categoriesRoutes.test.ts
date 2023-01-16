import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedAdminLogin, mockedCategory, mockedEditCategory, mockedUser } from "../../mocks";

describe("/categories", ()=>{
    let connection: DataSource

    beforeAll(async()=>{
        await AppDataSource.initialize().then(res => {
            connection = res
        }).catch(err => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post("/users").send(mockedUser)
        await request(app).post("/users").send(mockedUser)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /categories - Must be able to create category.", async() => {
        const tokenAdmin = await request(app).post("/login").send(mockedAdminLogin)
        const res = await request(app).post("/categories").set("Authorization", `Bearer ${tokenAdmin.body.token}`).send( mockedCategory)

        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("name")
        expect(res.status).toBe(201)
    })

    test("POST /categories - User should not be able to create category without authentication.", async() => {
        const res = await request(app).post("/categories").send( mockedCategory)

        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(401)
    })

    test("POST /categories - Should not be able to create category not being admin.", async() => {
        const tokenUser = await request(app).post("/login").send(mockedUser)
        const res = await request(app).post("/categories").set("Authorization", `Bearer ${tokenUser.body.token}`).send( mockedCategory)

        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(403)
    })


    test("GET /categories -  Must be able to list all categories.",async () => {
      
        const res = await request(app).get("/categories")
        expect(res.body).toHaveLength(1)
        expect(res.status).toBe(200)
     
    })

    test("GET /categories/:id/products -  Must be able to list all products from a category",async () => {
      
        const category = await request(app).get("/categories")
        const res = await request(app).get(`/categories/${category.body[0].id}/products`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("name")
        expect(res.body).toHaveProperty("product")
        
    })

    test("GET /categories/:id/products -  Should not be able to list products of a category with invalid id",async () => {
      
        const res = await request(app).get(`/categories/13970660-5dbe-423a-9a9d-5c23b37943cf/products`)
        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(404)
        
    })
    

    test("PATCH /categories/:id - Must be able to edit a category name", async() => {
        const tokenAdmin = await request(app).post("/login").send(mockedAdminLogin)
        const categoryToUpdade = await request(app).get("/categories")
        const res = await request(app).patch(`/categories/${categoryToUpdade.body[0].id}`).set("Authorization", `Bearer ${tokenAdmin.body.token}`).send(mockedEditCategory)

        expect(res.body).toHaveProperty("id")
        expect(res.body[0].name).toEqual("automobiles")
        expect(res.status).toBe(204)
    })

    test("PATCH /categories/:id - The user must not be able to edit the category without authentication.", async() => {
        const tokenUser = await request(app).post("/login").send(mockedUser)
        const categoryToUpdade = await request(app).get("/categories")
        const res = await request(app).patch(`/categories/${categoryToUpdade.body[0].id}`).set("Authorization", `Bearer ${tokenUser.body.token}`).send(mockedEditCategory)

        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(401)
    })

    test("PATCH /categories/:id - Must not be able to edit category not being admin.", async() => {
        const tokenUser = await request(app).post("/login").send(mockedUser)
        const categoryToUpdade = await request(app).get("/categories")
        const res = await request(app).patch(`/categories/${categoryToUpdade.body[0].id}`).set("Authorization", `Bearer ${tokenUser.body.token}`).send(mockedEditCategory)

        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(401)
    })
})