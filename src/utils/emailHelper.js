import emailjs from "@emailjs/browser";

export function sendEmails(assignments) {
  assignments.forEach(({ giver, recipient }) => {
    emailjs
      .send(
        import.meta.env.VITE_USER_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          to_email: giver.email,
          from_name: "Amigo Invisible",
          to_name: giver.name,
          message: `Te ha tocado regalarle a ${recipient.name}!`,
        },
        import.meta.env.VITE_API_KEY
      )
      .then(() => console.log("Correo enviado correctamente a", giver.email))
      .catch((err) => console.error("Error al enviar correo", err));
  });
}
