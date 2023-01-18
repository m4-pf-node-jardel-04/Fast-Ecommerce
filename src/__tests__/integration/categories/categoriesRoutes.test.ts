import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedAdmin, mockedAdminLogin, mockedCategory, mockedEditCategory, mockedUser, mockedUserLogin } from "../../mocks";

describe("/categories", ()=>{
    let connection: DataSource

    beforeAll(async()=>{
        await AppDataSource.initialize().then(res => {
            connection = res
        }).catch(err => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post("/users").send(mockedUser)
        await request(app).post("/users").send(mockedAdmin)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /categories - Must be able to create category.", async() => {
        const tokenAdmin = await request(app).post("/users/login").send(mockedAdminLogin)
        const res = await request(app).post("/categories").set("Authorization", `Bearer ${tokenAdmin.body.token}`).send(mockedCategory)

        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("name")
        expect(res.status).toBe(201)
    })

    test("POST /categories - User should not be able to create category without authentication.", async() => {
        const res = await request(app).post("/categories").send(mockedCategory)

        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(401)
    })

    test("POST /categories - Should not be able to create category not being admin.", async() => {
        const tokenUser = await request(app).post("/users/login").send(mockedUser)
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
        const tokenAdmin = await request(app).post("/users/login").send(mockedAdminLogin)
        const categoryToUpdade = await request(app).get("/categories")

        const res = await request(app).patch(`/categories/${categoryToUpdade.body[0].id}`).set("Authorization", `Bearer ${tokenAdmin.body.token}`).send(mockedEditCategory)
        const categoryUpdate = await request(app).get("/categories")

        expect(res.status).toBe(204)
        expect(categoryUpdate.body[0].name).toEqual("automobiles")

    })

    test("PATCH /categories/:id - The user must not be able to edit the category without authentication.", async() => {
        const categoryToUpdade = await request(app).get("/categories")
        const res = await request(app).patch(`/categories/${categoryToUpdade.body[0].id}`).send(mockedEditCategory)

        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(401)
    })

    test("PATCH /categories/:id - Must not be able to edit category not being admin.", async() => {
        const tokenUser = await request(app).post("/users/login").send(mockedUser)
        const categoryToUpdade = await request(app).get("/categories")
        const res = await request(app).patch(`/categories/${categoryToUpdade.body[0].id}`).set("Authorization", `Bearer ${tokenUser.body.token}`).send(mockedEditCategory)

        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(403)
    })


    test("DELETE /categories/:id -  The user must not be able to delete the category without authentication.",async () => {

        const categoryToUpdade = await request(app).get("/categories")

        const res = await request(app).delete(`/categories/${categoryToUpdade.body[0].id}`)
        
        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(401)
     
    })

    test("DELETE /categories/:id -  Must not be able to delete category not being admin.",async () => {
        const tokenuser = await request(app).post("/users/login").send(mockedUser)
        const category = await request(app).get("/categories")

        const res = await request(app).delete(`/categories/${category.body[0].id}`).set("Authorization", `Bearer ${tokenuser.body.token}`);
        
        expect(res.body).toHaveProperty("message")
        expect(res.status).toBe(403)
     
    })

    test("DELETE /categories/:id -  User should not be able to delete non-existent category.",async () => {
        const tokenAdmin = await request(app).post("/users/login").send(mockedAdmin)

        const res = await request(app).delete("/categories/33f14b7d-e020-4ba0-a05c-d10588934ddf}").set("Authorization", `Bearer ${tokenAdmin.body.token}`);
        
        expect(res.status).toBe(404)
     
    })
    
    
})