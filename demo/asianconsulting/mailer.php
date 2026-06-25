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
define('SMTP_USER',     'info@tuodominio.it');   // email Aruba mittente
define('SMTP_PASS',     'LA_TUA_PASSWORD');      // password casella Aruba
define('MAIL_FROM',     'info@tuodominio.it');   // mittente visibile
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
    $mail->Body = "
        <div style='font-family:sans-serif;max-width:560px;margin:0 auto'>
          <h2 style='color:#15533a;margin-bottom:4px'>Nuova richiesta</h2>
          <p style='color:#666;margin-top:0'>Dal sito Asian Consulting</p>
          <table style='width:100%;border-collapse:collapse;margin-top:16px'>
            <tr><td style='padding:10px 0;border-bottom:1px solid #eee;font-weight:700;width:130px'>Nome</td><td style='padding:10px 0;border-bottom:1px solid #eee'>" . htmlspecialchars($nome) . "</td></tr>
            <tr><td style='padding:10px 0;border-bottom:1px solid #eee;font-weight:700'>Attività</td><td style='padding:10px 0;border-bottom:1px solid #eee'>" . htmlspecialchars($attivita) . "</td></tr>
            <tr><td style='padding:10px 0;border-bottom:1px solid #eee;font-weight:700'>Email</td><td style='padding:10px 0;border-bottom:1px solid #eee'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></td></tr>
            <tr><td style='padding:10px 0;border-bottom:1px solid #eee;font-weight:700'>Telefono</td><td style='padding:10px 0;border-bottom:1px solid #eee'>" . ($tel ? htmlspecialchars($tel) : '—') . "</td></tr>
            <tr><td style='padding:10px 0;font-weight:700;vertical-align:top'>Messaggio</td><td style='padding:10px 0;white-space:pre-wrap'>" . htmlspecialchars($msg) . "</td></tr>
          </table>
        </div>
    ";
    $mail->AltBody = "Nome: $nome\nAttività: $attivita\nEmail: $email\nTel: $tel\n\n$msg";

    $mail->send();
    echo json_encode(['ok' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $mail->ErrorInfo]);
}
