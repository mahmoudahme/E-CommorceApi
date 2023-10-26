import chai from "chai";
import app from "../server.js";
import request from 'supertest';

const should = chai.should();
const expect = chai.expect ;
const assert = chai.assert ;

describe("GET ALL CATEGORIES / GET " , ()=>{
    it("return all categoies " , (done)=>{
        request(app).get("/api/v1/category").expect(res=>{
            console.log("Categories" + JSON.stringify(res.text))
        }).end(done) ;
    })
})

describe("GET CATEGORY BY ID / GET " , ()=>{
    it("return category " , (done)=>{
        request(app).get("/api/v1/category/65199243f8d64af1e787ca5b").expect(res=>{
            console.log("Category")
        }).end(done) ;
    })
})

describe("POST CATEGORY / POST " ,()=>{
    it("Create new Category" , (done)=>{
        request(app).post("/api/v1/category").expect(res=>{
            console.log("Category Created")
        }).end(done);
    })
})

describe("DELETE CATEGORY  /DELETE " , ()=>{
    it("delete category" , (done)=>{
        request(app).delete("/api/v1/category/65199243f8d64af1e787ca5b").expect(res=>{
            console.log("Category Deleted")
        }).end(done)
    })
})

describe("UPDATE CATEGORY /PUT" , ()=>{
    it('update category ',(done)=>{
        request(app).put("/api/v1/category/65199243f8d64af1e787ca5b").expect((res)=>{
            console.log("Category Updated");
            console.log("/////////////////////////////////////////// PRODUCT TEST //////////////////////////////////")
        }).end(done);
    })
    
})