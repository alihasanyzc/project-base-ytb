const mongoose = require('mongoose');
let instance = null;

class Database {
    constructor() {
        if (!instance) {
            this.mongoConnection = null;
            instance = this;
        }
        return instance;
    }

    async connect(options) {
        try {
            console.log("Database connection loading...");
            console.log("Connecting to:", options.CONNECTION_STRING);
            
            // Add connection options for better error handling
            const connectionOptions = {
                serverSelectionTimeoutMS: 5000,
                maxPoolSize: 10,
                minPoolSize: 1,
            };
            
            let db = await mongoose.connect(options.CONNECTION_STRING, connectionOptions);
            this.mongoConnection = db;
            console.log("Database connected successfully");
            
        } catch (err) {
            console.error("Database connection failed:");
            console.error("Error:", err.message);
            
            if (err.code === 'ECONNREFUSED') {
                console.error("\n❌ MongoDB Connection Error:");
                console.error("• MongoDB server is not running");
                console.error("• Please start MongoDB service:");
                console.error("  - macOS: brew services start mongodb-community");
                console.error("• Or install MongoDB:");
                console.error("  - brew tap mongodb/brew && brew install mongodb-community");
            }
            
            process.exit(1);
        }
    }
}

module.exports = Database;
