import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import cartModel from "../models/CartModel.js";
import orderModel from "../models/Order.js";


/////////////////CEARTE USER CART && ADD PRODUCT TO USER CART ///////////////////////////////////////////
export const createAndAddUserCart = async(req , res , next)=>{
    try {
        //check by userId
        verifyToken(req, res, async() => {
            if(req.user.id){
                const userCart = await cartModel.findOne({userId : req.user.id}) ;
                if(!userCart){
                    const createCart = new cartModel({userId : req.user.id , products : req.body.products})
                    await createCart.save();
                    res.status(200).json({message : "Cart Created" , Data : createCart})
                }else{
                    userCart.products.push(req.body.products[0])
                    await userCart.save();
                    res.status(200).json({Data : userCart})
                }
            }else{
                return next(new ApiError("You are not authenticated!" , 401)) ;
            }
        })
    } catch (error) {
        return next(new ApiError(`System Error ${error}` , 404)) 
    }
}
////////////////////////////GET USER CART //////////////////////////////////////////////
export const userCart = async(req, res , next )=>{
    try{
        verifyToken(req , res , async()=>{
            if(req.user.id){
                const cart  = await cartModel.find({userId : req.user.id})
                res.status(200).json({message : "User Cart " , Data : cart})
            }else{
                return next(new ApiError("You are not authenticated!" , 401)) ;
            }
        })
    }catch(error){
        return next(new ApiError(`System Error` , 404)) ;
    }   
}
///////////////////////////DELETE PRODUCT FROM CART //////////////////////////////////
export const deleteProductFromCart = async (req, res ,next )=>{
    try {
        const cartID = req.params.cartID  ;
        const productID = req.params.productID  ;
        verifyToken(req, res , async()=>{
            if(req.user.id){
                const cart  = await cartModel.findOne({userId : req.user.id});
                var newProducts = [];
                for(var i = 0 ; i <= cart.products.length-1 ; i++){
                    if(productID != cart.products[i]){
                        newProducts.push(cart.products[i]);
                    }
                }
                const updateCart = await cartModel.findByIdAndUpdate(cartID, {products : newProducts})
                 res.status(200).json({message : "User Cart" , Data : updateCart})
            }
        })
    } catch (error) {
        return next(ApiError(`System Error ${error}`, 404))
    }
}
//////////////////////////////////////////// MAKE ORDER FROM CART /////////////////////////
export const makeOrderFromCart =async(req , res , next)=>{
    try {

        const productID = req.params.productID  ;
        verifyToken(req, res , async () => {
            if (req.user.id) {
              const order = await orderModel.create({
                userId :req.user.id  ,
                productId : productID 
              })
              res.status(200).json({message : "Order Created" ,Data : order})
            } else {
              return next(new ApiError("You are not authenticated!" , 401)) ;
            }
        })
    } catch (error) {
        return next(ApiError(`System Error ${error}`, 404))
    }
}