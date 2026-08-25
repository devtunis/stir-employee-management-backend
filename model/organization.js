import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
  {
    roomId:{type:String,unqiue:true},
    nameOrganization: {type: String, trim: true},
    ownerId: {type: String},
    activity :{type:String},
    requests :[
      {
         _id: false,
        cin:{type:String},
        nom:{type:String},
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
,
    members :[
      {
         _id: false,
        cin:{type:String},
        role:{type:String,default:"user"},
        conge :{type:Number,default:21},
        salaire  :{type:Number,default:2000},
        next:{type:String,default:"nil"},
        response_conge :[
          {
          reponse:{type:String},
          cin_reponse:{type:String},
          reason :{type:String}
          }
        ],
        request_conge :[
          {
            _id:false,
            cin:{type:String},
            reason:{type:String},
            nbjr:{type:Number},
            roomId :{type:String},
            nom :{type:String},
            debut:{type:String},
            fin :{type:String},
            datedemande: {
              type: Date,
              default: Date.now
            }
            

          }
        ]

       
      }
    ]

 
  ,
  head:{type:String,default:"nil"},
  hr:{type:String,default:"nil"}

    
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model(
  "Organization",
  OrganizationSchema
);

export default Organization;