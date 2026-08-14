const COLORS = {
   background: '#f4f4f5', // --muted
   foreground: '#09090b', // --foreground
   card: '#ffffff', // --card
   cardForeground: '#09090b', // --card-foreground
   primary: '#1447e6', // --primary
   primaryForeground: '#eff6ff', // --primary-foreground
   mutedForeground: '#71717b', // --muted-foreground
   border: '#e4e4e7', // --border
}

export function passwordResetEmail({ resetUrl, appName = 'Acme Inc' }) {
   const text = `Recupera tu contraseña\n\nRecibimos una solicitud para restablecer la contraseña de tu cuenta de ${appName}.\n\nUsa este enlace (expira en 1 hora): ${resetUrl}\n\nSi no fuiste tú, puedes ignorar este correo.`

   const html = `
<!DOCTYPE html>
<html lang="es">
  <body style="margin:0; padding:0; background-color:${COLORS.background}; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.background}; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:420px;">
            <tr>
              <td style="background-color:${COLORS.card}; border:1px solid ${COLORS.border}; border-radius:12px; padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding-bottom:8px;">
                      <span style="font-size:20px; font-weight:600; color:${COLORS.cardForeground};">Recupera tu contraseña</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:24px;">
                      <p style="margin:0; font-size:14px; line-height:22px; color:${COLORS.mutedForeground};">
                        Recibimos una solicitud para restablecer la contraseña de tu cuenta.
                        Haz clic en el botón para elegir una nueva.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <a href="${resetUrl}"
                         style="display:inline-block; background-color:${COLORS.primary}; color:${COLORS.primaryForeground}; font-size:14px; font-weight:500; text-decoration:none; padding:10px 24px; border-radius:8px;">
                        Restablecer contraseña
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p style="margin:0; font-size:12px; line-height:18px; color:${COLORS.mutedForeground};">
                        Este enlace expira en 1 hora. Si no solicitaste este cambio, puedes ignorar este correo.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

   return { text, html }
}
