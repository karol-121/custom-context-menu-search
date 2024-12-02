Files in this directory are used to test data compatibility with newer version in the future.

In order for data in "testData.js" to work, the file have to be included in the manifest file first.
Then the storage can be manipulated by using "storageController.setData()" command in the inspect console (about:debugging)
and passing any object from "testData.js" file as an argument. i.e storageController.setData(testData.storage_v2) will populate the storage with data compatible with version 2