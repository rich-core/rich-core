<?php
$message_sent = false;
$error_msg = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to = "ashishgaike21@gmail.com"; // your email

  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $subject = strip_tags(trim($_POST["subject"]));
  $message = trim($_POST["message"]);

  if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($subject) || empty($message)) {
    $error_msg = "Please fill in all fields correctly.";
  } else {
    $email_subject = "New contact from $name: $subject";
    $email_content = "Name: $name\nEmail: $email\n\nMessage:\n$message\n";
    $email_headers = "From: $name <$email>";

    if (mail($to, $email_subject, $email_content, $email_headers)) {
      $message_sent = true;
    } else {
      $error_msg = "Sorry, your message could not be sent at this time.";
    }
  }
}
?>
