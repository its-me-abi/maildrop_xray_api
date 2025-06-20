
let API_URL = `https://api.maildrop.cc/graphql`

export class maildrop_api {
    constructor( account,url = API_URL) {

        this.email_id = account;
        this.inboxUrl = url;
    }
    get_all_messages_id_query_payload(inbox_id){
        //return graphql json object for sending
        var data = {
            "operationName": "GetInbox",
            "variables": {
                 "mailbox": inbox_id
            },
            "query": "query GetInbox($mailbox: String!) {\n  ping(message: \"Test\")\n  inbox(mailbox: $mailbox) {\n    id\n    subject\n    date\n    headerfrom\n    __typename\n  }\n  altinbox(mailbox: $mailbox)\n}\n"
        }
        return data;
    }
    get_one_email_query_payload(mailbox, msg_id) {
        //return graphql json object for sending
        var data = {
            "operationName": "GetMessage",
            "variables": {
                "mailbox": mailbox,
                "id": msg_id
            },
            "query": "query GetMessage($mailbox: String!, $id: String!) {\n  message(mailbox: $mailbox, id: $id) {\n    id\n    subject\n    date\n    headerfrom\n    data\n    html\n    __typename\n  }\n}"
        }
        return data;
    }

    send_query( query ) {
        // send grpahql query and return json data
        var json_query = JSON.stringify(query);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.inboxUrl, false);
        xhr.setRequestHeader( "content-type","application/json")
        xhr.send(json_query)
        var result = {}
        if (xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
        }
        return result ;
    }

    get_all_mail_ids(){
        var data = this.get_all_messages_id_query_payload(this.email_id)
        var responce_json = this.send_query(data)

        if (responce_json){
            return responce_json.data.inbox
        }
        return responce_json
    }

    get_one_mail(id){
        var data = this.get_one_email_query_payload(this.email_id, id)
        var responce_json = this.send_query(data)

        return responce_json.data.message
    }
    get_last_mail(){
            const inbox = this.get_all_mail_ids();
            if (inbox && inbox.length > 0) {
                const lastMessage = inbox[inbox.length - 1]; // Get the last message
                return lastMessage;
            }
    }
    getlink(id){
        var html = this.get_one_mail(id).html;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const anchor = doc.querySelector('a');
        const href = anchor.getAttribute('href');
        return href
    }
}



