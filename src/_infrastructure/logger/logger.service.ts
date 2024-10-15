import { Injectable, LoggerService } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class CustomLoggerService implements LoggerService {

  private timers: { [key: string]: number } = {};

  colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    fg: {
      black: '\x1b[30m',
      grey: '\x1b[90m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
    },
    bg: {
      black: '\x1b[40m',
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      blue: '\x1b[44m',
      magenta: '\x1b[45m',
      cyan: '\x1b[46m',
      white: '\x1b[47m',
    }
  }

  private getCallerInfo(step: number = 4): { className: string; methodName: string } {
    const stack = new Error().stack;
    if (!stack) return { className: '', methodName: '' };

    const stackLines = stack.split('\n');
    const callerLine = stackLines[step];

    const match = RegExp(/at (\w+)\.(\w+)/).exec(callerLine);
    if (match) {
      return { className: match[1], methodName: match[2] };
    } else {
      return { className: '', methodName: '' };
    }
  }

  private colorTag(color: string, text: string): string {
    let spaces = '';
    let count = text.length
    while (count++ < 4) {
      spaces += ' ';
    }
    return `${color}${this.colors.reverse}${text}${this.colors.reset}${color}${spaces}`;
  }

  private get currentTimestamp() {
    return dayjs().format('MMM DD, HH:mm:ss');
  }

  private get logPrefix() {
    const { className, methodName } = this.getCallerInfo();
    return `${this.colors.fg.blue}[${this.currentTimestamp}] [${className}.${methodName}]`
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(`${this.logPrefix} ${this.colorTag(this.colors.fg.cyan, 'LOG')} ${message}`, ...optionalParams, this.colors.reset);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(`${this.logPrefix} ${this.colorTag(this.colors.fg.yellow, 'WARN')} ${message}`, ...optionalParams, this.colors.reset);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(`${this.logPrefix} ${this.colorTag(this.colors.fg.red, 'ERR')} ${message}`, ...optionalParams, this.colors.reset);
  }

  debug(message: any, ...optionalParams: any[]) {
    console.log(`${this.logPrefix} ${this.colorTag(this.colors.fg.grey, 'DEBUG')} ${message}`, ...optionalParams, this.colors.reset);
  }

  start(){
    console.log(`${this.logPrefix} ${this.colorTag(this.colors.fg.cyan, 'LOG')} start`, this.colors.reset);
  }

  done() {
    console.log(`${this.logPrefix} ${this.colorTag(this.colors.fg.cyan, 'LOG')} done`, this.colors.reset);
  }

  timeStart(label: string){
    this.timers[label] = Date.now()
  }

  timeEnd(label: string, log?: string){
    const endTime = Date.now();
    const startTime = this.timers[label];

    if(!startTime) {
      this.log(`Timer with label '${label}' does not exist.`);
      return;
    }

    const duration = endTime - startTime;
    delete this.timers[label];

    const message = log ? `${log} - Completed in ${duration}ms` : `Completed in ${duration}ms`;
    this.log(message);

  }
}
