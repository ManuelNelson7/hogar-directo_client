import React from 'react'
import { useState } from 'react'

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')


{/*const Email = ({user}) => {
  
    const [email, setEmail] = useState(user)
    const [from, setFrom] = useState('duenodirecto22@gmail.com')
    const [fromName, setFromName] = useState('Dueño Directo')
    
    async function sendEmail () {
        const mailOptions = {
            to: email,
            from : {
                email: from,
                name: fromName
            },
            templateId: 'd-15d8f85e1cd54a46ba9ed1e97e81d975',
            //dynamic_template_data: {}
        }

        await sgMail.send(mailOptions).then(() => {}, console.error)
    };
}

export default Email*/}

module.exports = class Email {
    constructor(user) {
      this.to = user.email;
      this.fromEmail = 'duenodirecto22@gmail.com';
      this.fromName = 'Dueño Directo';
    }
  
    async sendEmail() {
      const mailOptions = {
        to: this.to,
        from: {
          email: this.fromEmail,
          name: this.fromName,
        },
        templateId: 'd-15d8f85e1cd54a46ba9ed1e97e81d975',
        //dynamic_template_data: {}
      };
  
      await sgMail.send(mailOptions).then(() => {}, console.error);
    }
};
