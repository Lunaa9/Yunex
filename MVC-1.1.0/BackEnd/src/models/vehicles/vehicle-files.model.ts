import { Schema, model } from "mongoose";

const vehicleFileSchema = new Schema({

    licensePlate: {
        type: String,
        required: true,
    },
    
    fileName: { // Nombre del archivo
        type: String,
        required: true,
        unique: true
    },
    fileType: { // Tipo de archivo (por extensión)
        type: String,
        required: true
    },
    fileData: { // El buffer con los datos del archivo
        type: Buffer,
        required: true
    },
    fileSize: { // Tamaño del archivo en kilobytes
        type: Number,
        required: true
    },
    mimeType: { // Tipo MIME del archivo
        type: String,
        required: true
    },
    uploadDate: { // Fecha de subida del archivo
        type: Date,
        default: Date.now,
        required: true
    }
});

const vehicleFileModel = model('vehicleFile', vehicleFileSchema);
export default vehicleFileModel;