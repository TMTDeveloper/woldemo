import * as dgram from 'dgram';
import * as net from 'net';
import { Buffer } from 'buffer';
const macBytes = 6;

interface WakeOptions {
  address?: string;
  port?: number;
}

export const createMagicPacket = macAddress => {
  const macBuffer = new Buffer(macBytes);
  const numMacs = 16;
  const buffer = new Buffer((1 + numMacs) * macBytes);

  if (macAddress.length === 2 * macBytes + (macBytes - 1)) {
    macAddress = macAddress.replace(new RegExp(macAddress[2], 'g'), '');
  }

  if (
    macAddress.length !== (2 * macBytes || macAddress.match(/[^a-fA-F0-9]/))
  ) {
    throw new Error("malformed MAC address '" + macAddress + "'");
  }

  // tslint:disable-next-line: no-shadowed-variable
  for (let i = 0; i < macBytes; ++i) {
    macBuffer[i] = parseInt(macAddress.substr(2 * i, 2), 16);
  }

  // tslint:disable-next-line: no-shadowed-variable
  for (let i = 0; i < macBytes; ++i) {
    buffer[i] = 0xff;
  }

  // tslint:disable-next-line: no-shadowed-variable
  for (let i = 0; i < numMacs; ++i) {
    macBuffer.copy(buffer, (i + 1) * macBytes, 0, macBuffer.length);
  }

  return buffer;
};

export const wakeCb = (macAddress, options, callback) => {
  if (options.constructor === Function) {
    callback = options;
    options = {};
  }

  // tslint:disable-next-line: variable-name
  const _options = {
    address: options.address ? options.address : '255.255.255.255',
    port: options.port ? options.port : 9,
  };

  const magicPacket = createMagicPacket(macAddress);
  const protocol = net.isIPv6(_options.address) ? 'udp6' : 'udp4';
  const socket = dgram.createSocket(protocol);

  socket.send(
    magicPacket,
    0,
    magicPacket.length,
    _options.port,
    _options.address,
    error => {
      if (!error) {
        callback(null, 'Magic Packet Sent!');
      }
    },
  );

  socket.on('error', error => {
    callback('ERROR: ' + error.stack);
    socket.close();
  });

  socket.once('listening', () => {
    socket.setBroadcast(true);
  });
};

export const wake = (
  macAddress: string,
  options?: WakeOptions,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    wakeCb(macAddress, options, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};
