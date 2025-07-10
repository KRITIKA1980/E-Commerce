// import mongoose from "mongoose"

// const CustomerSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//       minlength: [2, "Name must be at least 2 characters long"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       minlength: [6, "Password must be at least 6 characters long"],
//     },
//     role: {
//       type: String,
//       default: "customer",
//     },
//     confirmPassword: {
//       type: String,
//       required: [true, "Confirm password is required"],
//       validate: {
//         validator: function(value) {
//           return this.password === value;
//         },
//       },
//     },
//   },
//   {
//     timestamps: true,
//   },
// )

// // Index for faster email lookups
// CustomerSchema.index({ email: 1 })

// export default mongoose.model("Customer", CustomerSchema)

import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      default: "customer",
      enum: ["customer"],
    }
  },
  {
    timestamps: true,
  },
);

// Index for faster email lookups
CustomerSchema.index({ email: 1 });

// Add a method to compare passwords
CustomerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("Customer", CustomerSchema);