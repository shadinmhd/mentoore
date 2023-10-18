import mongoose from "mongoose";
import walletSchema from "./walletSchema"

interface IUser {
    name: string,
    email: string,
    password: string,
    type: string,
    image: string,
    wallet: {
        balance: number,
    },
    status: string,
    verified: boolean
}

interface IStudent extends IUser {
    bookings: {
        mentor: string,
        user: string,
        status: string,
        date: string,
        startTime: string
    }[]
}

interface IMentor extends IUser {
    description: string,
    category: string
}

interface IAdmin extends IUser {
    idAdmin: boolean
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: String,
    image: String,
    wallet: {
        type: walletSchema,
        default: {
            balance: 0
        }
    },
    status: {
        type: String,
        default: "active"
    },
    verified: {
        type: Boolean,
        default: false
    }

}, { discriminatorKey: "type", timestamps: true });

const studentSchema = new mongoose.Schema<IStudent>({
    name: String,
});

const mentorSchema = new mongoose.Schema<IMentor>({
    description: {
        type: String
    },
    category: {
        type: String
    }
});

const adminSchema = new mongoose.Schema<IAdmin>({
    idAdmin: {
        type: Boolean,
        required: true
    }
});

export const User = mongoose.model<IUser>("User", userSchema);
export const Student = User.discriminator("Student", studentSchema);
export const Mentor = User.discriminator("Mentor", mentorSchema);
export const Admin = User.discriminator("Admin", adminSchema);