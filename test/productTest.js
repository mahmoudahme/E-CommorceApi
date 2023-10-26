import chai from "chai";
import app from "../server.js";
import request from 'supertest';

const should = chai.should();
const expect = chai.expect ;
const assert = chai.assert ;

describe('GET ALL PRODUTS  /GET' , ()=>{
    it("return all Products", (done)=>{
        request(app).get('/api/v1/product').expect(201).expect(res=>{
            console.log("Products" + JSON.stringify(res.text))
        }).end(done)
    })
})


describe('GET PRODUCT BY ID',()=>{
    it('return product' , done=>{
        request(app).get('/api/v1/product/6519ddb3c1049221cfa8109a').expect(res=>{
            console.log("Product ")
        }).end(done)
    })
})


describe('POST PRODUCT  /POST',()=>{

    const newProduct = {

    }
    it('Create Product' , done=>{
        request(app).post('/api/v1/product/').send(newProduct).expect(res=>{
            console.log("Product Created")
        }).end(done)
    })
})


describe('UPDATE PROODUCT  /PUT',()=>{
    it('update product' , done=>{
        request(app).put('/api/v1/product/6519ddb3c1049221cfa8109a').expect(res=>{
            console.log("Product Updated")
        }).end(done)
    })
})

describe('DELETE PRODUCT  /DELETE',()=>{
    it('delete product' , done=>{
        request(app).delete('/api/v1/product/6519ddb3c1049221cfa8109a').expect(res=>{
            console.log("Product  Deleted")
            console.log("/////////////////////////////////////////// USER TEST //////////////////////////////////")

        }).end(done)
    })
})