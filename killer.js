const exec = require('child_process').exec;

const getParams = () => {
  return process.argv.slice(2)
}

const port = getParams()[0]

if (!port) {
  return console.log('lost port param !!!')
}

const order = `lsof -i :${port}`
const action = (err, stdout, stderr) => {
  if (err) {
    return console.log(err) 
  }

  console.log(stdout)

  stdout.split('\n').filter(line => {
    const p = line.trim().split(/\s+/)
    const address = p[1]

    if (address != undefined && address != "PID") {
      exec(`kill ${address}`, (err, stdout, stderr) => {
        if (err) {
          return console.log(`释放 ${port} 端口失败！！!`)
        }
        console.log(`占用 ${port} 端口的程序被成功杀掉！`)
      })
    }
  })
}

exec(order, action)