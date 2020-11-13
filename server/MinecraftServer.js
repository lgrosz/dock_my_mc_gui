import fs from 'fs';
import { spawn } from 'child_process';

const MCLOC = process.env.MCLOC || './';

// todo maybe I can use a semaphor to better manage the commands being sent
// into this process instead of member variables giving state
export default class MinecraftServer {

  constructor() {
    this.DEFAULT_PARAMS = ["-Xmx8G", "-Xms8G", "-jar", "../server.jar", "nogui"];

    this.logs = [];
    this.listeners = {
      stdout: [],
      stderr: []
    }
  }

  start () {
    if (!this.started) {
      this.started = true;
      this.logs = [];

      // create data folder if it doesn't exist
      if (!fs.existsSync(`${MCLOC}/data`)) {
        fs.mkdirSync(`${MCLOC}/data`);
      }

      this.java = spawn('java', this.DEFAULT_PARAMS, { cwd: `${MCLOC}/data` });

      this.java.stdout.on('data', data => this._onStdOut(data));
      this.java.stderr.on('data', data => this._onStdErr(data));

      this.java.on('exit', code => {
        this.started = false;
        console.log(`Minecraft server exited with code ${code}`);
      });
    } else {
      console.log('Cannot start two servers at once.')
    }
  }

  addEventListener(event, callback) {
    switch(event) {
      case 'stdout':
        this.listeners.stdout.push(callback);
        break;
      case 'stderr':
        this.listeners.stderr.push(callback);
        break;
      default:
        console.log(`Tried to subscribe to invalid event, ${event}.`)
        break;
    }
  }

  getLogs () {
    return [...this.logs];
  }

  send(s) {
    if (this.started) {
      this.java.stdin.write(s);
      this.java.stdin.write('\r\n');
    }
  }

  _onStdOut(data) {
    this.logs.push(data.toString());
    this.listeners.stdout.forEach(listener => listener(data.toString()));
  }

  _onStdErr(data) {
    this.logs.push(data.toString());
    this.listeners.stderr.forEach(listener => listener(data.toString()));
  }

}

