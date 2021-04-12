/// <reference types="@altv/types" />
import * as alt from 'alt-server';

export const databaseData = {};

/**
 * Look up a document by the fieldName and fieldValue in a repo by name.
 * @param fieldName String of the field name.
 * @param fieldValue String of the field value.
 * @param repoName ie. "Account"
 * @param callback undefined | document
 */
export async function fetchData(fieldName, fieldValue, repoName) {
    return new Promise(resolve => {
        const res = databaseData[repoName].find(x => x[fieldName] === fieldValue);
        if (!res) {
            return resolve(undefined);
        }
        return resolve(res);
    });
}