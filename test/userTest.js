import chai from "chai";
import app from "../server.js";
import request from 'supertest';

const should = chai.should();
const expect = chai.expect ;
const assert = chai.assert ;

describe("GET ALL USER  /GET", ()=>{
    it('return all Users' ,(done)=>{
        request(app).get('/api/v1/user/').expect((res)=>{
            console.log('Users')
        }).end(done) ;
    })
})

describe("GET USER BY ID  GET/" , ()=>{
    it("return user by id " , (done)=>{
        request(app).get('/api/v1/user/6516ca07cfd89a2272ee1599').expect((res)=>{
            console.log('User '); 
        }).end(done) ;
    })
})

describe("DELETE USER /DELETE" , ( )=>{
    it("Delete user " , (done)=>{
        request(app).delete("/api/v1/user/6516ca07cfd89a2272ee1599").expect((res)=>{
            console.log("USER DELETED");
        }).end(done);
    })
})

describe("UPDATE USER /PUT" , ()=>{
    it('update user ',(done)=>{
        request(app).put("/api/v1/user/6516ca07cfd89a2272ee1599").expect((res)=>{
            console.log("USER DELETED");
        }).end(done);
    })
    
})