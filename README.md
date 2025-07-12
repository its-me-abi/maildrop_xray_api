# maildrop_xray_api

A JavaScript library for reading emails from [maildrop.cc](https://maildrop.cc), returning email details as JSON.  
This library uses the maildrop.cc GraphQL API to retrieve inbox messages and email details.

## Features

- Fetch a list of message IDs for a maildrop inbox.
- Fetch full details of a single email by its ID.
- Retrieve the latest email from the inbox.
- Extract the first link from an email’s HTML body.

## Installation

Simply copy `maildrop.js` into your project.

## Usage

```js
import { maildrop_api } from './maildrop.js';

const inbox = 'your-inbox-name'; // without @maildrop.cc
const api = new maildrop_api(inbox);

// Get all mail IDs for this inbox
const allMails = api.get_all_mail_ids(); // returns array of message summaries

// Get details of one mail by ID
const mailId = allMails[0].id;
const mailData = api.get_one_mail(mailId);

// Get the latest mail
const lastMail = api.get_last_mail();

// Extract the first link from an email (by message ID)
const firstLink = api.getlink(mailId);
```

## API Reference

### `new maildrop_api(account, url = "https://api.maildrop.cc/graphql")`

- `account` (string): The inbox name (not full email address)
- `url` (string, optional): The maildrop GraphQL endpoint

### Methods

#### `get_all_mail_ids()`
Returns an array of message summaries (ID, subject, date, sender, etc.) for the inbox.

#### `get_one_mail(id)`
Returns the full details of a specific email by its message ID.

#### `get_last_mail()`
Returns the most recent email’s summary.

#### `getlink(id)`
Returns the first hyperlink URL found in the email’s HTML body (by message ID).

## Example Output

`get_all_mail_ids()` returns:

```js
[
  {
    id: "123",
    subject: "Welcome!",
    date: "2025-06-20T21:00:00Z",
    headerfrom: "hello@example.com"
  },
  ...
]
```

`get_one_mail(id)` returns:

```js
{
  id: "123",
  subject: "Welcome!",
  date: "2025-06-20T21:00:00Z",
  headerfrom: "hello@example.com",
  data: "...",
  html: "<html>...</html>"
}
```

## Technical notes

  this is my first javascript project with oop.
- Uses synchronous XMLHttpRequest – suitable for browser use in trusted contexts.
- Relies on the GraphQL API of maildrop.cc.
- Extracts the first `<a>` link from the HTML part of the message.

## License

MIT
