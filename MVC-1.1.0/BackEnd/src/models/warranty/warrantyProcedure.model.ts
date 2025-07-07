import { Schema, model } from "mongoose";


const warrantyProcedureSchema = new Schema({
    ticket:{//ticket File
        type:String,
        required:true,
        unique:true
    },
    name:{ //file name
        type:String,
        required:true,
        unique:true
    },
    fileType:{//file type
        type:String,
        required:true
    },
    data:{//the buffer with the data
        type:Buffer,
        required:true
    },
    size:{//file size in megabytes
        type:Number,
        required:true
    },
    mimetype:{//mimetype
        type:String,
        required:true
    },
    date:{//the date when the file was upload
        type:String,
        required:true
    }
})

const warrantyProcedureModel = model('warrantyProcedure',warrantyProcedureSchema);
export default warrantyProcedureModel;