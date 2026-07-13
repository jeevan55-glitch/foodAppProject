const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter foodItem name"],
        trim: true,
        maxLength:[100, "foodItem name cannot contain more than 100"]
    },
    price:{
        type:Number,
        required:[true, "please enter price"],
        maxLength:[5, "FoodItem price cannot be more than 5"]
    },
    description:{
        type:String,
        required:[true, "please enter description"],
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
        },
    ],
    menu:{
        type:mongoose.Schema.ObjectId,
        ref:"Menu"
    },
    stock:{
        type:String,
        required:[true, "please enter foodItem stock"],
        maxLength:[5,"foodItem length cannot be more than 5"],
        default:0
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      Comment: {
        type: String,
        required: true,
      },
    },
  ],
  ///////////ai///////////////////////
    aiDescription: {
    type: String,
    default: "",
  },
  aiTags: {
    type: [String],
    default: [],
  },
  aiAllergens: {
    type: [String],
    default: [],
  },

  aiServes: {
  type: String,
  default: ""
  },

  aiBestFor: {
  type: [String],
  default: []
  },
   ///////////ai///////////////////////
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("FoodItem",foodSchema)

