import { maildrop_api } from '../maildrop.js';
// this is first time iam using javascript code seems to be ugly
class Testclass {
    maildrop_api = new maildrop_api("shpytest111")
    show_all_messages(){
        var ids = this.maildrop_api.get_all_mail_ids()
        console.log("last message = ",this.maildrop_api.get_last_mail().id)
        for (const one_id of ids) {
            console.log(`mail id = ${one_id.id} ; subject = ${one_id.subject} `)
            console.log("got link ", this.maildrop_api.getlink(one_id.id) );
            console.log(this.maildrop_api.get_one_mail(one_id.id).html)
        }
    }

}
