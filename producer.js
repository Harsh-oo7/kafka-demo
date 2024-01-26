const { kafka } = require("./kafka");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init() {
    const producer = kafka.producer();
    console.log("Connecting...");
    await producer.connect();
    console.log("Connected");

    rl.setPrompt("> ")
    rl.prompt()

    rl.on("line", async (line) => {
        const [riderName, location] = line.split(" ");
        
        await producer.send({
            topic: "rider-updates",
            messages: [
                {
                    partition: location.toLocaleLowerCase() === 'north' ? 0 : 1,
                    key: 'location-updates',
                    value: JSON.stringify({
                        riderName,
                        location
                    })
                }
            ]
        })
    }).on("close", async () => {
        await producer.disconnect();
    })
}

init();