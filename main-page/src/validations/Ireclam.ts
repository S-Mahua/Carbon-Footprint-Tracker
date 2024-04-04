interface IReclaimInput {
  sessionId : any  ,
  addressUser : string ,
  messageUser : string,
  provider : string
}

interface IReclaimDataInput {
  statusUrl : string,
  item : string
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: boolean, b: string) => void;
}

interface ClientToServerEvents {
  message: (statusUrl : string, item: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}