const Mongoose = require('mongoose')

Mongoose.connect('mongodb://josepaes:123@localhost:27017/herois', { useNewUrlParser: true }, function(error) {
    if (!error) return;

    console.log('Falha na Conexão!!!', error)
})

const connection = Mongoose.connection
connection.once('open', () => console.log('Database Rodando!!'))

setTimeout(() => {
    const state = connection.readyState
    console.log('state', state)
}, 1000)

// 0: Disconectado
// 1:Conectado
// 2:Conectando
// 3: Disconectando

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })

    console.log('result Cadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('Itens', listItens)
}

main()