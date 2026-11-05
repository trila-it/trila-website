<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$budget = isset($data['budget']) ? trim($data['budget']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';

$invalid = [];
if ($name === '') {
    $invalid[] = 'name';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $invalid[] = 'email';
}
if ($message === '') {
    $invalid[] = 'message';
}
if ($invalid) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Campi non validi', 'fields' => $invalid]);
    exit;
}

$apiKey = getenv('RESEND_API_KEY');
if (!$apiKey && file_exists(__DIR__ . '/contact.config.php')) {
    $config = require __DIR__ . '/contact.config.php';
    if (is_array($config) && !empty($config['resend_api_key'])) {
        $apiKey = $config['resend_api_key'];
    }
}
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Configurazione mancante']);
    exit;
}

$recipients = ['andrea.bonacci20@gmail.com', 'lisamaiorano07@gmail.com'];

$payload = [
    'from' => 'Trila <info@trila.it>',
    'to' => $recipients,
    'reply_to' => $email,
    'subject' => 'Nuovo progetto - ' . $name,
    'text' => "Nome: {$name}\nEmail: {$email}\nBudget: " . ($budget !== '' ? $budget : 'non indicato') . "\n\n{$message}",
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 15,
]);
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Invio non riuscito']);
    exit;
}

echo json_encode(['ok' => true]);
