import chai from "chai";
import app from "../server.js";
import request from 'supertest';

const should = chai.should();
const expect = chai.expect ;
const assert = chai.assert ;

describe("GET ALL BRANDS / GET " , ()=>{
    it("return all brands " , (done)=>{
        request(app).get("/api/v1/brand").expect(res=>{
            console.log("brands" + JSON.stringify(res.text))
        }).end(done) ;
    })
})

describe("GET BRANDS BY ID / GET " , ()=>{
    it("return brand " , (done)=>{
        request(app).get("/api/v1/brand/65185967625f854fd3c01727").expect(res=>{
            console.log("brand")
        }).end(done) ;
    })
})

describe("POST brand / POST " ,()=>{
    it("Create new brand" , (done)=>{
        request(app).post("/api/v1/brand").expect(res=>{
            console.log("brand Created")
        }).end(done);
    })
})

describe("DELETE brand  /DELETE " , ()=>{
    it("delete brand" , (done)=>{
        request(app).delete("/api/v1/brand/65185967625f854fd3c01727").expect(res=>{
            console.log("brand Deleted")
        }).end(done)
    })
})

describe("UPDATE brand /PUT" , ()=>{
    it('update brand ',(done)=>{
        request(app).put("/api/v1/brand/65185967625f854fd3c01727").expect((res)=>{
            console.log("brand Updated");
            console.log("/////////////////////////////////////////// CATEGORY TEST //////////////////////////////////")
        }).end(done);
    })
    
})