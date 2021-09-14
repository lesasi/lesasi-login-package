import firebase from 'firebase-admin';
import { IFirebase } from '../../interfaces/IFirebase.interface';
import { IFirebaseArgs, IFirebaseAuth } from "../../interfaces/IFirebaseTypes.interface";

export class Firebase implements IFirebase {
    protected firebaseAuth: IFirebaseAuth;

    constructor(firebaseArgs: IFirebaseArgs) {
        this.setFirebaseAuth(firebaseArgs);
    }

    setFirebaseAuth(firebaseArgs: IFirebaseArgs): void {
        const {
            appName,
            projectId,
            privateKeyId,
            privateKey,
            clientEmail,
            clientId,
            clientX509CertUrl,
        } = firebaseArgs;

        const credentials  = {
            type: 'service_account',
            projectId,
            privateKeyId,
            private_key: privateKey.replace(/\\n/g, '\n'),
            clientEmail,
            clientId,
            authUri: 'https://accounts.google.com/o/oauth2/auth',
            tokenUri: 'https://oauth2.googleapis.com/token',
            authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
            clientX509CertUrl
        };

        firebase.initializeApp({
            credential: firebase.credential.cert(credentials),
            databaseURL: `https://${appName}.firebaseio.com`,
        });

        this.firebaseAuth = firebase.auth();
    }

    getAuth() {
        return this.firebaseAuth;
    }
};