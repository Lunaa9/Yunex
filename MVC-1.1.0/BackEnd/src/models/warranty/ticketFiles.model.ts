import { Schema, model } from "mongoose";

const ticketFilesSchema = new Schema({
    ticket:{//The ticket identifier
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

const ticketFilesModel = model('ticketFiles', ticketFilesSchema);
export default ticketFilesModel;