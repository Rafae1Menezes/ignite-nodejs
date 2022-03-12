import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database'): Promise<Connection> => {
  const defaultaOpstion = await getConnectionOptions();

  return createConnection(Object.assign(defaultaOpstion, { host }));
};
