import fs  from 'fs';
import  util from 'util';

const logFile = fs.createWriteStream('log.txt', { flags: 'w' });
const logStdout = process.stdout;

export default function () {
	return function (d: any) {
		logFile.write(util.format(d) + '\n');
		logStdout.write(util.format(d) + '\n');
	}
};