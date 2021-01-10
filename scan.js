
const isPortReachable = require('is-port-reachable');
const color = require("colors");
const args = process.argv.slice(2);

const timeout = parseInt(args[3]) || 100;

(async () => {
    
    if(args.length < 3){
        console.log(color.red("Error! Paramaters needed: <ip> <min port> <max port> [timeout]"))
        console.log(color.red("Example: 127.0.0.1 0 1024 100"))    
        process.exit(0);
    }
    let ip = args[0]
    let min_value = parseInt(args[1])
    let max_value = parseInt(args[2])
    let list = []
    for(let i=0;i<100;i++) console.log("")
    console.log(color.cyan(`======== dkPortScanner [ TCP ] ========`))
    console.log(" ")
    console.log(color.magenta(` I will be scanning ${ip} in `))
    console.log(color.magenta(`        the range ${min_value} to ${max_value}`))
    console.log(" ")
    console.log(color.cyan(`======== dkPortScanner [ TCP ] ========`))
    for(let i=0;i<7;i++) console.log("")
    setTimeout(async () => {
        for (let i=min_value;i<max_value;i++){
            let start = new Date().getTime()
            let data = await awaitData(ip,i)
            if(data){
                list.push({port: i, time: new Date().getTime() - start})
                console.log(color.green(`Port ${i} is open, and was scanned in ${new Date().getTime() - start} ms`))
            }else{
                console.log(color.red(`Port ${i} is closed, and was scanned in ${new Date().getTime() - start} ms`))
            }
        }
        printWorking(list,max_value)
    },2500)
})()

function printWorking(list,max_value){
    console.log(color.cyan(`======== dkPortScanner [ RESULTS ] ========`))
    console.log(" ")
    list.forEach(el => {
        console.log(color.green(`Port ${el.port} is open, and was scanned in ${el.time} ms`))
    })
    console.log(" ")
    console.log(`        In total: ${color.bold(`${list.length}`)}/${max_value} ports are open!`)
    console.log(" ")
    console.log(color.cyan(`======== dkPortScanner [ RESULTS ] ========`))
    process.exit(0);
}

async function awaitData(ip, port) {
    let data = await isPortReachable(port, {host: `${ip}`,timeout: timeout})
    return data
}