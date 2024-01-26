const { kafka } = require("./kafka");
const group = process.argv[2];

async function init() {
    const consumer = kafka.consumer({ groupId: group });

    await consumer.connect();

    await consumer.subscribe({
        topics: ["rider-updates"],
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`${group}: [${topic}]: PARTITION: ${partition} OFFSET: ${message.offset} VALUE: ${message.value.toString()}`)
        }
    })
}

init();