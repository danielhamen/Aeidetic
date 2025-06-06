// /lib/Firebase.ts
import * as Server from "./lib/ServerAPI";
import * as Client from "./lib/ClientAPI";

export interface ServerFirebaseAPI {
  Auth: Server.AuthAPI;
  Storage: Server.StorageAPI;
  Firestore: Server.FirestoreAPI;
}

export interface ClientFirebaseAPI {
  Auth: Client.AuthAPI;
}

export const ServerAPI: ServerFirebaseAPI = {
  Auth: Server.Auth,
  Storage: Server.Storage,
  Firestore: Server.Firestore,
};

export const ClientAPI: ClientFirebaseAPI = {
  Auth: Client.Auth,
};
