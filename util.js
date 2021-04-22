import AsyncStorage from '@react-native-async-storage/async-storage';

// getItem - get an item from storage
// setItem - set an item in storage
// clear() - get rid of everything in storage
// getAllKeys - show you the list of keys in storage

console.log(Object.keys(AsyncStorage));

export const store = async (key, val) =>
{
    try {
        const storeVal = JSON.stringify(val);
        await AsyncStorage.setItem(key, storeVal);
    }
    catch (error)
    {
        console.log("Something bad happened: ", error);
    }
}

export const retrieve = async (key) =>
{
    try {
        const val = await AsyncStorage.getItem(key)
        return val;
    }
    catch (error)
    {
        console.log('Could not retrieve the data: ', error);
        return error;
    }
}
