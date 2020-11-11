import fs from 'fs';
import { spawn } from 'child_process';

const MCLOC = process.env.MCLOC || './';

export default class MinecraftServer {

  constructor() {
    this.DEFAULT_PARAMS = ["-Xmx8G", "-Xms8G", "-jar", "../server.jar", "nogui"];
  }

  start () {
    // create data folder if it doesn't exist
    if (!fs.existsSync(`${MCLOC}/data`)) {
      fs.mkdirSync(`${MCLOC}/data`);
    }

    const java = spawn('java', this.DEFAULT_PARAMS, { cwd: `${MCLOC}/data` });

    java.stdout.on('data', data => {
      console.log(data.toString());
    });

    java.stderr.on('data', data => {
      console.log(data.toString());
    });

    java.on('exit', code => {
      console.log(`Minecraft server exited with code ${code}`);
    });
  }

  logs () {
    // print out x previous lines of logs
  }

  send(s) {
    console.log(`Running command ${s}`)
    // send s to java process
  }

  onStdOut() {
    // callback for when there's a line on std out
    //   - go through event listener callbacks
  }

  onStdErr() {
    // callback for when there's a line on std err
  }

}

