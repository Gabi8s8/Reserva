import { Schema, model } from 'mongoose' //chama qual função do pacote mongoose quer carregar

const HouseSchema = new Schema ({ //tipo uma tabela do sql
    thumbnail: String,
    description: String,
    price: Number, 
    location: String,
    status: Boolean,
    user: {
        type: Schema.Types.ObjectId, //id
        ref: 'User'  // falar que o produto é o do usuario
    }
}, {
    toJSON: {
        virtuals: true
    }
})

HouseSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:4000/files/${this.thumbnail}`;
});

export default model('House', HouseSchema)