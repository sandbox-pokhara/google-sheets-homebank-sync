# google-sheets-homebank-sync

A script to sync google sheets data to HomeBank file stored in google drive. HomeBank is a desktop app to manage your personal accounting. This script allows users to entry data from their mobile phone using google sheets app and it is automatically synced to HomeBank.

## Usage

1. Save your HomeBank file (xhb) to google drive.
2. Create a google sheet document with Sheet1 which has the following layout.
   | | A | B | C | D | E | F |
   | ----- | ------------------ | ------- | ------ | ------------- | ------ | ------- |
   | **1** | Date | Account | Amount | Description | Status | Synced? |
   | **2** | 3/17/2024 17:34:58 | 8 | -7000 | A description | 2 | TRUE |

   Note: Account ID can be parsed by reading the xhb file using a text editor. Find your account ID in `<account>` tag. Status of the transaction, 2 means reconciled.

3. Add the script from main.js from Extensions -> Apps Script. Add necessary permissions if required.
4. Run the script manually or add a trigger that runs sync function periodically.
