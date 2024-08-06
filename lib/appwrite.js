import {Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.IssamFissoune.Ballieue",
    projectId: "66671d1d00373c40f93e",
    databaseId: "6667264f001e72eaa30b",
    userCollectionId: "666726830031fbf8fb1a",
    locationCollectionId: "666727560004f6c07d0f",
    gameCollectionId: "66672ddd0030af35d904",
    storageId: "66673ad500051f17b878"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

//make a new user for the app with appwrite
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
                pace: 33,
                shooting: 33,
                passing: 33,
                dribbling: 33,
                defense: 33,
                physical: 33,
                position: "ST",
            }
        )
      return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

//handle sign in

export const signIn = async (email, password)=> {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    }catch (error){
        throw new Error(error)
    }
}

//get the current user to display the name on landing page
export const getCurrentUser = async () =>{
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error

        return currentUser.documents[0]
    }catch (error){
        console.log(error)
    }
}

//get the current session so it can be used to logout
export const listSessions = async () => {
    try {
        const sessions = await account.listSessions();
        return sessions;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//logout by destroying current session
export const logout = async () => {
    try {
        const sessions = await account.listSessions();
        if (sessions.sessions.length > 0) {
            await account.deleteSession('current');
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//get all locations from db
export const getAllLocations = async () => {
    try {
        const locations = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.locationCollectionId,
        );
        return locations.documents;
    } catch (error) {
        throw new Error(error);
    }
};

//get all users from the db
export const getAllUsers = async () => {
    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId
        );
        return users.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}



