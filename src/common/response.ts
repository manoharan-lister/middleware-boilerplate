import {  Res } from '@nestjs/common';
import { Response} from 'express';
export const response=function(status,statusCode,message,data,res){
    if(status==true){
        res.status(statusCode).json({
            success:true,
            message:message,
            data:data
        });
    }else{
        res.status(statusCode).json({
            success:false,
            error:{
                message:message
            }
        }); 
    }
    

}
// module.exports={
//     success:success
// }