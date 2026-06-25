<?php
/**
 * Asian Consulting — Mailer
 * SMTP Aruba via PHPMailer
 *
 * Configura le costanti qui sotto prima di andare live.
 * PHPMailer va installato via Composer oppure scaricato manualmente
 * nella cartella vendor/ (vedi README in fondo al file).
 */

// ── Configurazione ──────────────────────────────────────────
define('SMTP_HOST',     'smtps.aruba.it');      // host Aruba
define('SMTP_PORT',     465);                    // SSL
define('SMTP_USER',     'info@asianconsulting.it');   // email Aruba mittente
define('SMTP_PASS',     'Info_Asian123-');      // password casella Aruba
define('MAIL_FROM',     'info@asianconsulting.it');   // mittente visibile
define('MAIL_FROM_NAME','Asian Consulting');
define('MAIL_TO',       'andrea.bonacci20@gmail.com'); // dove arrivano le richieste
define('MAIL_SUBJECT',  'Nuova richiesta dal sito — Asian Consulting');
// ─────────────────────────────────────────────────────────────

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Accetta solo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Metodo non consentito']);
    exit;
}

// Legge JSON o form-data
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) $data = $_POST;

// Sanitizza
$nome     = trim(strip_tags($data['nome']     ?? ''));
$attivita = trim(strip_tags($data['attivita'] ?? ''));
$email    = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$tel      = trim(strip_tags($data['tel']      ?? ''));
$msg      = trim(strip_tags($data['messaggio'] ?? ''));

// Validazione base
if (!$nome || !$attivita || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Campi obbligatori mancanti o email non valida']);
    exit;
}

// Carica PHPMailer
require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL porta 465
    $mail->Port       = SMTP_PORT;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_TO);
    $mail->addReplyTo($email, $nome); // rispondendo vai direttamente al cliente

    $mail->Subject = MAIL_SUBJECT;
    $mail->isHTML(true);

    // Incorpora il logo come immagine inline (CID) — visibile anche senza connessione
    $mail->addEmbeddedImage(__DIR__ . '/assets/img/logo.png', 'logo', 'logo.png', 'base64', 'image/png');

    $nome_safe     = htmlspecialchars($nome);
    $attivita_safe = htmlspecialchars($attivita);
    $email_safe    = htmlspecialchars($email);
    $tel_safe      = $tel ? htmlspecialchars($tel) : '—';
    $msg_safe      = htmlspecialchars($msg);

    $mail->Body = "<!DOCTYPE html>
<html lang='it'>
<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'></head>
<body style='margin:0;padding:40px 20px;background:#e8e0d0;font-family:Arial,sans-serif;'>
<table width='100%' cellpadding='0' cellspacing='0' role='presentation'>
<tr><td align='center'>
<table width='560' cellpadding='0' cellspacing='0' role='presentation'
  style='max-width:560px;width:100%;background:#fbf8f1;border-radius:16px;overflow:hidden;box-shadow:0 6px 32px rgba(19,35,29,.15);'>

  <tr>
    <td style='background:#15533a;padding:36px 40px 28px;text-align:center;'>
      <img src='cid:logo' width='96' height='96' alt='Asian Consulting'
        style='display:block;margin:0 auto 18px;border-radius:50%;background:#fff;padding:6px;box-shadow:0 0 0 3px #9ee84a;'>
      <p style='margin:0 0 8px;color:#9ee84a;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;'>Nuova richiesta dal sito</p>
      <p style='margin:0;color:#fbf8f1;font-size:26px;font-weight:900;letter-spacing:-.01em;'>Asian Consulting</p>
    </td>
  </tr>

  <tr><td style='height:4px;background:linear-gradient(90deg,#9ee84a 0%,#34a866 50%,#1f6b4a 100%);'></td></tr>

  <tr>
    <td style='padding:32px 40px 24px;'>
      <p style='margin:0 0 28px;font-size:15px;color:rgba(19,35,29,.65);line-height:1.5;'>
        Hai ricevuto una nuova richiesta di contatto. Ecco i dettagli:
      </p>
      <table width='100%' cellpadding='0' cellspacing='0' role='presentation'>
        <tr><td style='padding:13px 0;border-bottom:1px solid #ede5d4;'>
          <p style='margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1f6b4a;'>Nome</p>
          <p style='margin:0;font-size:16px;color:#13231d;font-weight:600;'>$nome_safe</p>
        </td></tr>
        <tr><td style='padding:13px 0;border-bottom:1px solid #ede5d4;'>
          <p style='margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1f6b4a;'>Attività</p>
          <p style='margin:0;font-size:16px;color:#13231d;font-weight:600;'>$attivita_safe</p>
        </td></tr>
        <tr><td style='padding:13px 0;border-bottom:1px solid #ede5d4;'>
          <p style='margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1f6b4a;'>Email</p>
          <p style='margin:0;font-size:16px;'><a href='mailto:$email_safe' style='color:#1f6b4a;text-decoration:none;font-weight:600;border-bottom:1px solid #9ee84a;'>$email_safe</a></p>
        </td></tr>
        <tr><td style='padding:13px 0;border-bottom:1px solid #ede5d4;'>
          <p style='margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1f6b4a;'>Telefono</p>
          <p style='margin:0;font-size:16px;color:#13231d;font-weight:600;'>$tel_safe</p>
        </td></tr>
        <tr><td style='padding:13px 0;'>
          <p style='margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1f6b4a;'>Messaggio</p>
          <p style='margin:0;font-size:15px;color:#13231d;line-height:1.65;white-space:pre-wrap;background:#f3ecd9;padding:16px 18px;border-radius:8px;border-left:3px solid #34a866;'>$msg_safe</p>
        </td></tr>
      </table>

      <table width='100%' cellpadding='0' cellspacing='0' role='presentation' style='margin-top:28px;'>
        <tr><td align='center'>
          <a href='mailto:$email_safe'
             style='display:inline-block;background:#15533a;color:#fbf8f1;font-weight:700;font-size:14px;letter-spacing:.04em;text-decoration:none;padding:14px 36px;border-radius:8px;border-bottom:3px solid #0d3322;'>
            Rispondi a $nome_safe →
          </a>
        </td></tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style='background:#13231d;padding:18px 40px;text-align:center;'>
      <p style='margin:0;color:rgba(251,248,241,.4);font-size:11px;letter-spacing:.06em;'>Asian Consulting &nbsp;·&nbsp; Social Media per Ristoranti</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body></html>";

    $mail->AltBody = "Nuova richiesta — Asian Consulting\n\nNome: $nome\nAttività: $attivita\nEmail: $email\nTel: $tel\n\n$msg";

    $mail->send();
    echo json_encode(['ok' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $mail->ErrorInfo]);
}
