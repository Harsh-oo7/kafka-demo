const { Kafka } = require('kafkajs')

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["<PRIVATE_IP>:9092"]
        })

        const admin = kafka.admin();
        console.log('Connecting...')
        await admin.connect()
        console.log('Connected!')

        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        })
        console.log('Created topic Users')
        await admin.disconnect()
    }
    catch(e) {
        console.error(`[example/topic] ${e.message}`, e)
    }
    finally {
        process.exit(0)
    }
}

run();
