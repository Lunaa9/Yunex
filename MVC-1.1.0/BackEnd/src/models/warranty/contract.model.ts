import { Schema, model } from 'mongoose';

const contractSchema = new Schema({
    clientName: {//Client name   
        type: String,
        required:true
    },
    contractName: {//Contract name
        type: String,
        required: true
    },
    handover:{//handover file 
        type: Object,
        required: true,
    },
    initWarranty: {//The warranty start date
        type: String,
        required: true
    },
    endWarranty: {//The warranty end date
        type: String,
        required: true
    },
    ceco: {//The ceco if it has
        type: Number,
        required: false
    },
    activeWarranty: {//The status of the contract warranty
        type: Boolean,
        required: true
    }
})
const contractModel = model('contract', contractSchema);
export default contractModel;