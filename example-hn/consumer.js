const { Kafka } = require('kafkajs')


async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["<PRIVATE_IP>:9092"]
        })

        const consumer = kafka.consumer({
            "groupId": "test"
        });
        console.log('Connecting...')
        await consumer.connect()
        console.log('Connected!')

        
        consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        consumer.run({
            "eachMessage": async ({ topic, partition, message }) => {
                console.log(`RVD message ${message.value.toString()} on partition ${partition}`) 
            }
        })
    }
    catch(e) {
        console.error(`[example/consumer] ${e.message}`, e)
    }
}

run();
