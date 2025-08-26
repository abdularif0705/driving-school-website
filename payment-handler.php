<?php
require_once 'vendor/autoload.php'; // You'll need to install Stripe PHP library

// Set your secret key
\Stripe\Stripe::setApiKey('sk_test_your_stripe_secret_key_here'); // Replace with your actual secret key

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    try {
        // Calculate total amount including taxes
        $baseAmount = $input['price'];
        $taxes = round($baseAmount * 0.13); // 13% HST for Ontario
        $totalAmount = $baseAmount + $taxes;
        
        // Convert to cents for Stripe
        $amountInCents = $totalAmount * 100;
        
        // Course details for description
        $courseNames = [
            'bde' => 'MTO Approved BDE Course',
            'individual' => 'Individual Driving Lesson',
            'carRental' => 'Rent Car for Road Test'
        ];
        
        $courseName = $courseNames[$input['course']];
        $description = $courseName;
        
        if ($input['course'] === 'individual' && $input['lessons'] > 1) {
            $description .= " ({$input['lessons']} lessons)";
        }
        
        // Create a PaymentIntent
        $paymentIntent = \Stripe\PaymentIntent::create([
            'amount' => $amountInCents,
            'currency' => 'cad',
            'description' => $description,
            'metadata' => [
                'course' => $input['course'],
                'student_name' => $input['studentInfo']['firstName'] . ' ' . $input['studentInfo']['lastName'],
                'student_email' => $input['studentInfo']['email'],
                'student_phone' => $input['studentInfo']['phone'],
                'lessons' => $input['lessons'] ?? 1,
                'driving_school' => 'Rajput Driving School Windsor'
            ],
            'receipt_email' => $input['studentInfo']['email'],
        ]);
        
        // Log the registration attempt
        $logData = [
            'timestamp' => date('Y-m-d H:i:s'),
            'course' => $input['course'],
            'amount' => $totalAmount,
            'student_info' => $input['studentInfo'],
            'payment_intent_id' => $paymentIntent->id
        ];
        
        // Save to log file (create registrations directory first)
        if (!file_exists('registrations')) {
            mkdir('registrations', 0755, true);
        }
        
        file_put_contents(
            'registrations/registration_' . date('Y-m-d') . '.log',
            json_encode($logData) . "\n",
            FILE_APPEND | LOCK_EX
        );
        
        // Return client secret
        echo json_encode([
            'client_secret' => $paymentIntent->client_secret,
            'amount' => $totalAmount,
            'course' => $courseName
        ]);
        
    } catch (\Stripe\Exception\CardException $e) {
        // Card was declined
        http_response_code(400);
        echo json_encode(['error' => $e->getMessage()]);
        
    } catch (\Stripe\Exception\RateLimitException $e) {
        // Too many requests made to the API too quickly
        http_response_code(429);
        echo json_encode(['error' => 'Rate limit exceeded']);
        
    } catch (\Stripe\Exception\InvalidRequestException $e) {
        // Invalid parameters were supplied to Stripe's API
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
        
    } catch (\Stripe\Exception\AuthenticationException $e) {
        // Authentication with Stripe's API failed
        http_response_code(401);
        echo json_encode(['error' => 'Authentication failed']);
        
    } catch (\Stripe\Exception\ApiConnectionException $e) {
        // Network communication with Stripe failed
        http_response_code(500);
        echo json_encode(['error' => 'Network error']);
        
    } catch (\Stripe\Exception\ApiErrorException $e) {
        // Generic Stripe error
        http_response_code(500);
        echo json_encode(['error' => 'Payment processing error']);
        
    } catch (Exception $e) {
        // Something else happened, completely unrelated to Stripe
        http_response_code(500);
        echo json_encode(['error' => 'An unexpected error occurred']);
    }
    
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
