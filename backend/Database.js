
require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI

class Database {
    static async connectDB() {
        // database has problem
        try {
            const client = await MongoClient.connect(url);
            const database = client.db('side_projects');
            console.log('Connected')
            return { client, database };
        } catch (error) {
            console.error('Connection to MongoDB Error: ' + error)
        }
    }

    static async saveCode(data) {
        const { client, database } = await this.connectDB();
        try {
            const collection = database.collection('codeSharingApp');
            await collection.insertOne(data)
        } catch (error) {
            console.error(error)
        } finally {
            client.close();
        }
    }

    static async getCode(id) {
        const { client, database } = await this.connectDB();
        try {
            const collection = database.collection('codeSharingApp');
            const data = await collection.findOne({ uniqueId: id});
            console.log(data)
            return data;
        } catch (error) {
            console.error(error)
        } finally {
            client.close();
        }
    }

    static async updateCode(id, code, language) {
        const { client, database } = await this.connectDB();
        try {
            const filter = { uniqueId: id };
            const update = {
                $set: {
                    code: code,
                    language: language 
                }
            };

            const collection = database.collection('codeSharingApp');
            const data = await collection.updateOne(filter, update);
            console.log('Updated the data at: ' + id);




            
        } catch (error) {
            console.error(error)
        } finally {
            client.close();
        }
    }


}

module.exports = Database