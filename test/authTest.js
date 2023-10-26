import chai from "chai";
import app from "../server.js";
import request from 'supertest';

const should = chai.should();
const expect = chai.expect ;
const assert = chai.assert ;

describe("LOGIN  /login", ()=>{
    const user ={
        email :"nabil@gmail.com",
        password : "123456789"
    }
    it('login to the system ' , (done)=>{
        request(app).post("/api/v1/auth/login").send(user).expect((res)=>{
            console.log("User  >>> " + JSON.stringify(res.text))
        }).end(done)
    })
    it('return all Users' ,(done)=>{
        request(app).get('/api/v1/user/').expect((res)=>{
            console.log('Users')
        }).end(done) ;
    })

})

describe("REGISTER  /register", ()=>{
    const user ={
        firstName : "Mahmoud" , 
        lastName : "Ahmed" ,
        email :"anyEmail@gmail.com",
        password : "123456789"
    }
    it('Register to the system ' , (done)=>{
        request(app).post("/api/v1/auth/register").send(user).expect((res)=>{
            console.log("User  >>> " + JSON.stringify(res.text))
            console.log("/////////////////////////////////////////// BRAND TEST //////////////////////////////////")
        }).end(done)
    })
    
})
