import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

export default async (req = NextApiRequest, res = NextApiResponse) => {
  const { email, name } = req.body
  const msg = {
    to: email,
    from: {
      email: 'duenodirecto22@gmail.com',
      name: 'Dueño Directo',
    },
    templateId: 'd-15d8f85e1cd54a46ba9ed1e97e81d975',
    dynamic_template_data: {
      url: 'http://localhost:3000/registrarse',
      support_email: 'dueñodirecto22@gmail.com',
      main_url: 'http://localhost:3000',
      name: name
    }
  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' })
  }
}