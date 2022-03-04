import winston from "winston";

class Logger {
  private client: winston.Logger;
  constructor() {
    this.client = winston.createLogger({
      format: winston.format.json(),
      transports: new winston.transports.Console(),
    });
  }
  // eslint-disable-next-line
  public info(message: string, data?: any): void {
    this.client.info(message, data);
  }
  // eslint-disable-next-line
  public warn(message: string, data?: any): void {
    this.client.warn(message, data);
  }
  // eslint-disable-next-line
  public error(message: string, data?: any): void {
    this.client.error(message, data);
  }
}
const logger = new Logger();

export default logger;
