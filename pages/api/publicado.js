import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_APIKEY);

export default async (req = NextApiRequest, res = NextApiResponse) => {
  const { email, name, uid } = req.body
  const msg = {
    to: email,
    from: {
      email: 'duenodirecto22@gmail.com',
      name: 'Dueño Directo',
    },
    templateId: 'd-162fa9c642084f24b7ae29e58af93845',
    dynamic_template_data: {
      url: `http://localhost:3000/anuncios/${uid}`,
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