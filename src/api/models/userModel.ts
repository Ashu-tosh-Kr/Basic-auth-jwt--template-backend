import { model, Schema } from "mongoose";
import { isEmail } from 'validator'
import bcrypt from 'bcrypt'

interface IUser{
    email: string,
    password:string
}

const userSchema = new Schema<IUser>({

    email: {
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate:[isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true,'Please provide a password'],
        minlength: [6,'Password is too short'],

    }
})


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

//doesnt work with typescript
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error("Inorrect password")
    }
    throw Error("Incorrrect Email")
}

export default model<IUser>('user',userSchema)