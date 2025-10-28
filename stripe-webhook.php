<?php
require_once 'vendor/autoload.php';
require_once 'mailer/PHPMailer/PHPMailer.php';
require_once 'mailer/PHPMailer/SMTP.php';
require_once 'mailer/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Set your webhook endpoint secret
$endpoint_secret = 'whsec_your_webhook_secret_here'; // Replace with your actual webhook secret

$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
$event = null;

try {
    $event = \Stripe\Webhook::constructEvent(
        $payload, $sig_header, $endpoint_secret
    );
} catch(\UnexpectedValueException $e) {
    // Invalid payload
    http_response_code(400);
    exit();
} catch(\Stripe\Exception\SignatureVerificationException $e) {
    // Invalid signature
    http_response_code(400);
    exit();
}

// Handle the event
switch ($event['type']) {
    case 'payment_intent.succeeded':
        $paymentIntent = $event['data']['object'];
        
        // Payment succeeded, send confirmation email
        sendConfirmationEmail($paymentIntent);
        
        // Save completed registration
        saveRegistration($paymentIntent);
        
        break;
        
    case 'payment_intent.payment_failed':
        $paymentIntent = $event['data']['object'];
        
        // Log failed payment
        logFailedPayment($paymentIntent);
        
        break;
        
    default:
        // Unexpected event type
        http_response_code(400);
        exit();
}

http_response_code(200);

function sendConfirmationEmail($paymentIntent) {
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Set the SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'rajputwindsor@gmail.com'; // Your email
        $mail->Password   = 'your_email_password'; // Your email password (use app password for Gmail)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        
        // Recipients
        $mail->setFrom('rajputwindsor@gmail.com', 'Rajput Driving School Windsor');
        $mail->addAddress($paymentIntent->metadata->student_email, $paymentIntent->metadata->student_name);
        $mail->addBCC('rajputwindsor@gmail.com'); // Send copy to business
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Registration Confirmation - Rajput Driving School Windsor';
        
        $courseNames = [
            'bde' => 'MTO Approved Beginner Driver Education (BDE) Course',
            'individual' => 'Individual Driving Lesson',
            'carRental' => 'Rent Car for Road Test'
        ];
        
        $courseName = $courseNames[$paymentIntent->metadata->course];
        $amount = number_format($paymentIntent->amount / 100, 2);
        
        $emailBody = getEmailTemplate($paymentIntent, $courseName, $amount);
        $mail->Body = $emailBody;
        
        $mail->send();
        
        // Log successful email
        error_log("Confirmation email sent to: " . $paymentIntent->metadata->student_email);
        
    } catch (Exception $e) {
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }
}

function getEmailTemplate($paymentIntent, $courseName, $amount) {
    $studentName = $paymentIntent->metadata->student_name;
    $paymentDate = date('F j, Y \a\t g:i A', $paymentIntent->created);
    $paymentId = substr($paymentIntent->id, -8); // Show last 8 characters for security
    $lessonsText = '';
    
    if ($paymentIntent->metadata->course === 'individual' && $paymentIntent->metadata->lessons > 1) {
        $lessonsText = "<tr><th>Lessons:</th><td>{$paymentIntent->metadata->lessons} hours</td></tr>";
    }
    
    return "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Registration Confirmation - Rajput Driving School</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
            .email-container { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #CE252A 0%, #a01e22 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .footer { background: #f8f9fa; padding: 25px; text-align: center; font-size: 14px; color: #666; border-top: 1px solid #eee; }
            .highlight { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 10px; border-left: 4px solid #CE252A; margin: 25px 0; }
            .success-badge { background: #28a745; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            .details-table th { text-align: left; padding: 12px 0; color: #495057; font-weight: 600; border-bottom: 1px solid #dee2e6; }
            .details-table td { padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: 500; }
            .next-steps { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .contact-info { background: #d1ecf1; border: 1px solid #bee5eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .quick-contact { background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center; }
            h2 { color: #CE252A; margin-bottom: 20px; }
            h3 { color: #495057; margin-bottom: 15px; }
            .footer-badge { display: inline-block; background: #6c757d; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin: 5px; }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>
                <div class='logo'>🚗 Rajput Driving School Windsor</div>
            <h1>Registration Confirmed!</h1>
            </div>
            
            <div class='content'>
                <h2>Dear {$studentName},</h2>
                
            <p>Thank you for registering with <strong>Rajput Driving School Windsor</strong>! We're excited to help you on your journey to becoming a safe and confident driver.</p>
                
                <div class='highlight'>
                <h3>📋 Registration Details</h3>
                <table class='details' width='100%'>
                    <tr><th>Course:</th><td>{$courseName}</td></tr>
                    <tr><th>Amount Paid:</th><td>CAD \${$amount}</td></tr>
                    <tr><th>Payment Date:</th><td>{$paymentDate}</td></tr>
                    <tr><th>Payment ID:</th><td>{$paymentId}</td></tr>
                    </table>
                </div>
                
            <h3>🎯 What's Next?</h3>
            <ul>
                <li><strong>Confirmation Call:</strong> Our team will contact you within 24-48 hours to schedule your lessons</li>
                <li><strong>Course Materials:</strong> You'll receive access to online materials and resources</li>
                <li><strong>Scheduling:</strong> We'll work with you to create a flexible schedule that fits your needs</li>
                <li><strong>Preparation:</strong> Make sure to have your G1 license ready for in-car lessons</li>
                    </ul>
                </div>
                
            <div class='highlight'>
                <h3>📞 Contact Information</h3>
                <p><strong>Phone:</strong> (226) 246-2224<br>
                <strong>Email:</strong> rajputwindsor@gmail.com<br>
                <strong>Address:</strong> Windsor, ON</p>
                </div>
                
            <p>If you have any questions or need to make changes to your registration, please don't hesitate to contact us.</p>
                
            <p>Welcome to the Rajput Driving School family!</p>
                
            <p>Best regards,<br>
                <strong>The Rajput Driving School Team</strong><br>
            <em>Windsor's Award-Winning Driving School</em></p>
            </div>
            
            <div class='footer'>
            <p>Rajput Driving School Windsor | Windsor, ON | (226) 246-2224</p>
            <p>Award of Excellence - Distinguished Teaching Driving Schools</p>
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
        </div>
    </body>
    </html>
    ";
}

function saveRegistration($paymentIntent) {
    $registration = [
        'timestamp' => date('Y-m-d H:i:s'),
        'payment_id' => $paymentIntent->id,
        'amount' => $paymentIntent->amount / 100,
        'course' => $paymentIntent->metadata->course,
        'student_name' => $paymentIntent->metadata->student_name,
        'student_email' => $paymentIntent->metadata->student_email,
        'student_phone' => $paymentIntent->metadata->student_phone,
        'lessons' => $paymentIntent->metadata->lessons ?? 1,
        'status' => 'completed'
    ];
    
    // Save to completed registrations file
    if (!file_exists('registrations')) {
        mkdir('registrations', 0755, true);
    }
    
    file_put_contents(
        'registrations/completed_registrations.json',
        json_encode($registration) . "\n",
        FILE_APPEND | LOCK_EX
    );
}

function logFailedPayment($paymentIntent) {
    $failedPayment = [
        'timestamp' => date('Y-m-d H:i:s'),
        'payment_id' => $paymentIntent->id,
        'amount' => $paymentIntent->amount / 100,
        'student_email' => $paymentIntent->metadata->student_email ?? 'unknown',
        'error' => 'Payment failed'
    ];
    
    if (!file_exists('registrations')) {
        mkdir('registrations', 0755, true);
    }
    
    file_put_contents(
        'registrations/failed_payments.log',
        json_encode($failedPayment) . "\n",
        FILE_APPEND | LOCK_EX
    );
}
?>
