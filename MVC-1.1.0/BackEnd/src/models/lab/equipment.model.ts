import { model, Schema } from "mongoose";

const equipmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    modules: {
        type: Array,
        required: false,
        default: []
    }
});

const EquipmentModel = model("equipments", equipmentSchema);

export default EquipmentModel;