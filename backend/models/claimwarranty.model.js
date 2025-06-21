
import mongoose from "mongoose";

const claimWarrantySchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const ClaimWarranty = mongoose.model("claimwarranty", claimWarrantySchema);

export default ClaimWarranty;